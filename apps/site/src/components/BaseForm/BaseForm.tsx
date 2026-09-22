"use client";

import {
	FormEvent,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import axios from "axios";

import axiosInstance from "@/lib/utils/axiosInstance";
import { hasDeadlinePassed } from "@/lib/utils/applicationWindow";

import styles from "./BaseForm.module.scss";

export type DraftFieldValue = string | string[];
export type DraftFields = Record<string, DraftFieldValue>;

interface DraftResponse {
	draft_application_data: {
		application_type: string;
		fields: Record<string, DraftFieldValue>;
	} | null;
}

const FIELDS_WITH_OTHER = [
	"pronouns",
	"ethnicity",
	"school",
	"major",
	"experienced_technologies",
	"dietary_restrictions",
];

const DRAFT_DEBOUNCE_MS = 800;
const SKIP_DRAFT_FIELDS = new Set([
	"application_type",
	"resume",
	"drawing_response",
]);

interface BaseFormProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
	className?: string;
	hideSubmit?: boolean;
	onDraftHydrate?: (fields: DraftFields) => void;
}

export default function BaseForm({
	applicationType,
	applyPath,
	className,
	hideSubmit = false,
	onDraftHydrate,
	children,
}: PropsWithChildren<BaseFormProps>) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [sessionExpired, setSessionExpired] = useState(false);
	const [draftFields, setDraftFields] = useState<DraftFields>({});
	const [draftLoaded, setDraftLoaded] = useState(false);
	const [hasUserEdited, setHasUserEdited] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const hasHydratedDraft = useRef(false);

	useEffect(() => {
		axiosInstance
			.get<DraftResponse>("/api/user/application/draft", {
				params: { application_type: applicationType },
			})
			.then((res) => {
				setDraftFields(res.data.draft_application_data?.fields ?? {});
			})
			.catch((err) => {
				if (axios.isAxiosError(err) && err.response?.status === 401) {
					setSessionExpired(true);
				}
			})
			.finally(() => setDraftLoaded(true));
	}, [applicationType]);

	useEffect(() => {
		if (!draftLoaded || hasHydratedDraft.current) return;

		const form = formRef.current;
		if (!form) return;

		onDraftHydrate?.(draftFields);

		for (const [name, value] of Object.entries(draftFields)) {
			if (SKIP_DRAFT_FIELDS.has(name)) continue;
			const fields = Array.from(form.elements).filter(
				(
					element,
				): element is
					| HTMLInputElement
					| HTMLSelectElement
					| HTMLTextAreaElement =>
					(element instanceof HTMLInputElement ||
						element instanceof HTMLSelectElement ||
						element instanceof HTMLTextAreaElement) &&
					element.name === name,
			);

			for (const field of fields) {
				if (field instanceof HTMLInputElement && field.type === "checkbox") {
					field.checked = Array.isArray(value) && value.includes(field.value);
					field.dispatchEvent(new Event("change", { bubbles: true }));
					continue;
				}

				if (field instanceof HTMLInputElement && field.type === "radio") {
					field.checked = value === field.value;
					if (field.checked) {
						field.dispatchEvent(new Event("change", { bubbles: true }));
					}
					continue;
				}

				if (!Array.isArray(value)) {
					field.value = value;
					field.dispatchEvent(new Event("input", { bubbles: true }));
					field.dispatchEvent(new Event("change", { bubbles: true }));
				}
			}
		}

		hasHydratedDraft.current = true;
		setHasUserEdited(false);
	}, [draftFields, draftLoaded, onDraftHydrate]);

	useEffect(() => {
		if (!hasUserEdited || !draftLoaded) return;

		const timeoutId = window.setTimeout(() => {
			axiosInstance
				.post("/api/user/application/draft", {
					application_type: applicationType,
					fields: draftFields,
				})
				.catch((err) => {
					if (axios.isAxiosError(err) && err.response?.status === 401) {
						setSessionExpired(true);
					}
				});
		}, DRAFT_DEBOUNCE_MS);

		return () => window.clearTimeout(timeoutId);
	}, [applicationType, draftFields, draftLoaded, hasUserEdited]);

	const saveDraftField = useCallback(
		(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
			if (!field.name || SKIP_DRAFT_FIELDS.has(field.name)) return;
			if (field instanceof HTMLInputElement && field.type === "file") return;

			let value: DraftFieldValue;

			if (field instanceof HTMLInputElement && field.type === "checkbox") {
				const form = formRef.current;
				if (!form) return;
				value = Array.from(
					form.querySelectorAll<HTMLInputElement>(
						`input[type="checkbox"][name="${CSS.escape(field.name)}"]:checked`,
					),
				).map((input) => input.value);
			} else if (field instanceof HTMLInputElement && field.type === "radio") {
				if (!field.checked) return;
				value = field.value;
			} else {
				value = field.value;
			}

			setDraftFields((prev) => ({ ...prev, [field.name]: value }));
			if (hasHydratedDraft.current) {
				setHasUserEdited(true);
			}
		},
		[],
	);

	function handleDraftCapture(event: FormEvent<HTMLFormElement>) {
		const field = event.target;
		if (
			field instanceof HTMLInputElement ||
			field instanceof HTMLSelectElement ||
			field instanceof HTMLTextAreaElement
		) {
			saveDraftField(field);
		}
	}

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		// Disable native post submission
		event.preventDefault();

		// On the chance that a user presses submit after the deadline,
		// this check is to prevent the application from submitting
		// and to show the message that applications have closed
		if (hasDeadlinePassed()) {
			window.location.reload();
			return;
		}

		setSessionExpired(false);

		const formData = new FormData(event.currentTarget);
		// Use other values when selected
		for (const field of FIELDS_WITH_OTHER) {
			const otherField = `_other_${field}`;
			const otherFieldValue = formData.get(otherField);

			formData.delete(otherField);

			const valuesWithoutOther = formData
				.getAll(field)
				.filter(
					(value) =>
						value !== "other" &&
						value !== "Other" &&
						value !== "Other (Please specify)",
				);

			formData.delete(field);

			for (const value of valuesWithoutOther) formData.append(field, value);

			if (otherFieldValue) formData.append(field, otherFieldValue);
		}

		try {
			setIsSubmitting(true);
			const res = await axiosInstance.post(applyPath, formData);
			if (res.status === 201) {
				// Use window.location instead of router.push in order
				// to force reload the page to allow user identity to
				// update with the new status
				window.location.href = "/portal";
				return;
			}
		} catch (err) {
			console.error(err);
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401) {
					setSessionExpired(true);
				}
			}
			setIsSubmitting(false);
		}
	};

	const sessionExpiredMessage = (
		<p className="text-red-500 w-11/12">
			Your session has expired. Please{" "}
			<a href="/login" target="_blank" className="text-blue-600 underline">
				log in from a new tab
			</a>{" "}
			to restore your session and then try submitting again.
		</p>
	);

	return (
		<form
			ref={formRef}
			method="post"
			encType="multipart/form-data"
			className={className}
			onSubmit={handleSubmit}
			onInputCapture={handleDraftCapture}
			onChangeCapture={handleDraftCapture}
		>
			<input
				type="text"
				name="application_type"
				value={applicationType}
				readOnly
				hidden
			/>
			{draftLoaded ? (
				children
			) : (
				<p className={styles.draftStatus}>Loading your draft...</p>
			)}
			{sessionExpired && sessionExpiredMessage}
			{!hideSubmit && (
				<button
					type="submit"
					className={styles.applyButton}
					disabled={isSubmitting || !draftLoaded}
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			)}
		</form>
	);
}
