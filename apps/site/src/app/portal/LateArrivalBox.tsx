"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import useArrivalTime from "@/lib/utils/useArrivalTime";

import styles from "./PortalDashboard.module.scss";

const DEFAULT_CHECKIN_TIME = "17:00";
const LATE_ARRIVAL_MIN = "18:00";
const LATE_ARRIVAL_MAX = "19:30";
const MAX_REASON_LENGTH = 2048;

const GENERIC_SUBMIT_ERROR =
	"We could not save your arrival time. Please try again.";
const REFRESH_ERROR =
	"Your arrival time was saved, but we couldn't refresh it. Please try again.";

/** Marks an error message as safe to show verbatim (it came from the backend). */
class BackendResponseError extends Error {}

type LateArrivalBoxProps = {
	applicationRole: "Hacker" | "Mentor";
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

function formatTimeLabel(value: string): string {
	const [hours, minutes] = value.split(":");
	const date = new Date();
	date.setHours(Number(hours), Number(minutes));
	return date.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

export default function LateArrivalBox({
	applicationRole,
	isOpen,
	onOpenChange,
}: LateArrivalBoxProps) {
	const { arrivalData, error: loadError, isLoading, mutate } = useArrivalTime();

	const [willArriveLate, setWillArriveLate] = useState<"" | "yes" | "no">("");
	const [arrivalTime, setArrivalTime] = useState(LATE_ARRIVAL_MIN);
	const [reason, setReason] = useState("");
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [needsRefresh, setNeedsRefresh] = useState(false);
	const submissionInFlight = useRef(false);
	const formRef = useRef<HTMLFormElement>(null);
	const closedActionRef = useRef<HTMLElement>(null);
	const pendingStatusRef = useRef<HTMLElement>(null);
	const shouldRestoreFocus = useRef(false);

	const currentArrivalTime = arrivalData?.arrival_time ?? null;
	const hasLateTime =
		currentArrivalTime !== null && currentArrivalTime !== DEFAULT_CHECKIN_TIME;
	const pendingEditRequest = arrivalData?.late_arrival_edit_request ?? null;
	const isEditMode = hasLateTime;

	// Reset the form to a clean slate every time it is opened, defaulting the
	// time field to the applicant's current late arrival time when editing.
	useEffect(() => {
		if (!isOpen) return;
		setSubmitError(null);
		setNeedsRefresh(false);
		setWillArriveLate("");
		setReason("");
		setArrivalTime(
			isEditMode && currentArrivalTime ? currentArrivalTime : LATE_ARRIVAL_MIN,
		);
	}, [isOpen, isEditMode, currentArrivalTime]);

	useEffect(() => {
		if (isOpen) {
			formRef.current
				?.querySelector<HTMLElement>("select, input, textarea")
				?.focus();
			return;
		}

		if (shouldRestoreFocus.current) {
			shouldRestoreFocus.current = false;
			closedActionRef.current?.querySelector<HTMLElement>("button")?.focus();
		}
	}, [isOpen, hasLateTime, pendingEditRequest]);

	useEffect(() => {
		if (isOpen && pendingEditRequest) {
			shouldRestoreFocus.current = false;
			onOpenChange(false);
			pendingStatusRef.current?.focus();
		}
	}, [isOpen, onOpenChange, pendingEditRequest]);

	function closeForm() {
		setSubmitError(null);
		setNeedsRefresh(false);
		shouldRestoreFocus.current = true;
		onOpenChange(false);
	}

	async function refreshArrivalData() {
		if (submissionInFlight.current) return;
		submissionInFlight.current = true;
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			await mutate();
			closeForm();
		} catch {
			setNeedsRefresh(true);
			setSubmitError(REFRESH_ERROR);
		} finally {
			submissionInFlight.current = false;
			setIsSubmitting(false);
		}
	}

	async function retryLoad() {
		try {
			await mutate();
		} catch {
			// SWR exposes the error through `loadError`; handling the rejection
			// here prevents the click handler from creating an unhandled promise.
		}
	}

	function validateTime(value: string): string | null {
		if (!value) {
			return "Please choose an arrival time.";
		}
		if (value < LATE_ARRIVAL_MIN || value > LATE_ARRIVAL_MAX) {
			return "Please choose a time between 6:00 PM and 7:30 PM.";
		}
		if (isEditMode && value === currentArrivalTime) {
			return "Please choose a new arrival time before submitting.";
		}
		return null;
	}

	function validateReason(value: string): string | null {
		const cleaned = value.trim();
		if (!cleaned) {
			return "Please tell us why you are arriving late.";
		}
		if (cleaned.length > MAX_REASON_LENGTH) {
			return `Reason must be ${MAX_REASON_LENGTH} characters or fewer.`;
		}
		return null;
	}

	async function submitLateArrival(timeValue: string, reasonValue: string) {
		if (pendingEditRequest) {
			setSubmitError("Your existing edit request is still awaiting approval.");
			return;
		}
		if (submissionInFlight.current) return;
		submissionInFlight.current = true;
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const formData = new URLSearchParams({
				arrival_time: timeValue,
				late_arrival_reason: reasonValue.trim(),
			});
			const response = await fetch("/api/user/rsvp/late-arrival", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formData,
			});

			if (!response.ok) {
				let detail = GENERIC_SUBMIT_ERROR;
				try {
					const body = await response.json();
					if (body?.detail) {
						detail = body.detail;
					}
				} catch {
					// Non-JSON error body; fall back to the generic message.
				}
				throw new BackendResponseError(detail);
			}

			try {
				await mutate();
				closeForm();
			} catch {
				setNeedsRefresh(true);
				setSubmitError(REFRESH_ERROR);
			}
		} catch (err) {
			// Only surface messages we know came from the backend response; a
			// network failure or unexpected exception gets a stable fallback
			// instead of leaking a raw browser/exception message.
			setSubmitError(
				err instanceof BackendResponseError
					? err.message
					: GENERIC_SUBMIT_ERROR,
			);
		} finally {
			submissionInFlight.current = false;
			setIsSubmitting(false);
		}
	}

	function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitError(null);

		if (needsRefresh) {
			void refreshArrivalData();
			return;
		}

		if (!willArriveLate) {
			setSubmitError("Please let us know if you will be arriving late.");
			return;
		}

		if (willArriveLate === "no") {
			closeForm();
			return;
		}

		const timeError = validateTime(arrivalTime);
		if (timeError) {
			setSubmitError(timeError);
			return;
		}

		const reasonError = validateReason(reason);
		if (reasonError) {
			setSubmitError(reasonError);
			return;
		}

		void submitLateArrival(arrivalTime, reason);
	}

	function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitError(null);

		if (needsRefresh) {
			void refreshArrivalData();
			return;
		}

		const timeError = validateTime(arrivalTime);
		if (timeError) {
			setSubmitError(timeError);
			return;
		}

		const reasonError = validateReason(reason);
		if (reasonError) {
			setSubmitError(reasonError);
			return;
		}

		void submitLateArrival(arrivalTime, reason);
	}

	if (pendingEditRequest) {
		return (
			<section
				ref={pendingStatusRef}
				className={styles.lateArrivalStatus}
				aria-live="polite"
				tabIndex={-1}
			>
				<p className={styles.lateArrivalStatusText}>
					Pending approval:{" "}
					<strong>{formatTimeLabel(pendingEditRequest)}</strong>
				</p>
				{arrivalData?.late_arrival_edit_reason && (
					<p className={styles.lateArrivalStatusText}>
						Reason: {arrivalData.late_arrival_edit_reason}
					</p>
				)}
				<p className={styles.lateArrivalStatusText}>
					Your edit request is awaiting approval from our team.
				</p>
			</section>
		);
	}

	if (!isOpen) {
		if (isLoading) {
			return (
				<section className={styles.lateArrivalPromptWindow}>
					<PrimaryButton
						type="button"
						className={styles.lateArrivalPromptButton}
						disabled
					>
						Plan on arriving late? Please fill out this form!
					</PrimaryButton>
					<p className={styles.lateArrivalStatusText} role="status">
						Checking your arrival time&hellip;
					</p>
				</section>
			);
		}

		if (loadError) {
			return (
				<section className={styles.lateArrivalStatus}>
					<p className={styles.lateArrivalStatusError} role="alert">
						We couldn&apos;t load your arrival time.
					</p>
					<button
						type="button"
						className={styles.lateArrivalRetry}
						onClick={() => void retryLoad()}
					>
						Retry
					</button>
				</section>
			);
		}

		if (hasLateTime && currentArrivalTime) {
			return (
				<section ref={closedActionRef} className={styles.lateArrivalStatus}>
					<p className={styles.lateArrivalStatusText}>
						Current arrival time:{" "}
						<strong>{formatTimeLabel(currentArrivalTime)}</strong>
					</p>
					{arrivalData?.late_arrival_reason && (
						<p className={styles.lateArrivalStatusText}>
							Reason: {arrivalData.late_arrival_reason}
						</p>
					)}
					<button
						type="button"
						className={styles.lateArrivalEditLink}
						onClick={() => onOpenChange(true)}
					>
						Request edit
					</button>
				</section>
			);
		}

		return (
			<section ref={closedActionRef} className={styles.lateArrivalPromptWindow}>
				<PrimaryButton
					type="button"
					className={styles.lateArrivalPromptButton}
					onClick={() => onOpenChange(true)}
				>
					Plan on arriving late? Please fill out this form!
				</PrimaryButton>
			</section>
		);
	}

	const title = `${applicationRole} Application (Continued)`;

	return (
		<section className={styles.lateArrivalWindow}>
			<RetroWindow title={title} framedContent>
				<form
					ref={formRef}
					className={styles.lateArrivalContent}
					onSubmit={isEditMode ? handleEditSubmit : handleCreateSubmit}
					noValidate
				>
					{isEditMode ? (
						<>
							<label className={styles.lateArrivalField}>
								<span className={styles.lateArrivalLabel}>
									Choose your new expected arrival time between 6:00 - 7:30 PM.
								</span>
								<input
									type="time"
									name="arrival_time"
									className={styles.lateArrivalInput}
									min={LATE_ARRIVAL_MIN}
									max={LATE_ARRIVAL_MAX}
									value={arrivalTime}
									onChange={(event) => setArrivalTime(event.target.value)}
									required
								/>
							</label>
							<label className={styles.lateArrivalField}>
								<span className={styles.lateArrivalLabel}>
									Reason for late arrival.
								</span>
								<textarea
									name="late_arrival_reason"
									className={styles.lateArrivalTextarea}
									value={reason}
									onChange={(event) => setReason(event.target.value)}
									maxLength={MAX_REASON_LENGTH}
									rows={3}
									required
								/>
							</label>
						</>
					) : (
						<>
							<label className={styles.lateArrivalField}>
								<span className={styles.lateArrivalLabel}>
									Check-in starts at 5 PM on Friday, Oct. 16th, 2026. Will you
									be arriving later than check-in?
								</span>
								<select
									name="will_arrive_late"
									className={styles.lateArrivalSelect}
									value={willArriveLate}
									onChange={(event) =>
										setWillArriveLate(event.target.value as "" | "yes" | "no")
									}
									required
								>
									<option value="" disabled>
										Select an option
									</option>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</select>
							</label>

							{willArriveLate === "yes" && (
								<>
									<label className={styles.lateArrivalField}>
										<span className={styles.lateArrivalLabel}>
											Late check-in starts at 6 PM on Friday. Choose your
											expected arrival time between 6:00 - 7:30 PM.
										</span>
										<input
											type="time"
											name="arrival_time"
											className={styles.lateArrivalInput}
											min={LATE_ARRIVAL_MIN}
											max={LATE_ARRIVAL_MAX}
											value={arrivalTime}
											onChange={(event) => setArrivalTime(event.target.value)}
											required
										/>
									</label>
									<label className={styles.lateArrivalField}>
										<span className={styles.lateArrivalLabel}>
											Reason for late arrival.
										</span>
										<textarea
											name="late_arrival_reason"
											className={styles.lateArrivalTextarea}
											value={reason}
											onChange={(event) => setReason(event.target.value)}
											maxLength={MAX_REASON_LENGTH}
											rows={3}
											required
										/>
									</label>
								</>
							)}
						</>
					)}

					{submitError && (
						<p className={styles.lateArrivalError} role="alert">
							{submitError}
						</p>
					)}

					<div className={styles.lateArrivalActions}>
						{needsRefresh ? (
							<PrimaryButton
								type="button"
								className={styles.lateArrivalSubmit}
								disabled={isSubmitting}
								onClick={() => void refreshArrivalData()}
							>
								{isSubmitting ? "Refreshing..." : "Retry refresh"}
							</PrimaryButton>
						) : (
							<PrimaryButton
								type="submit"
								className={styles.lateArrivalSubmit}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Submitting..." : "Submit"}
							</PrimaryButton>
						)}
						<button
							type="button"
							className={styles.lateArrivalCancel}
							onClick={closeForm}
							disabled={isSubmitting}
						>
							Cancel
						</button>
					</div>
				</form>
			</RetroWindow>
		</section>
	);
}
