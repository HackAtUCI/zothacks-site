"use client";

import { FormEvent, PropsWithChildren, useState } from "react";
import axios from "axios";

import axiosInstance from "@/lib/utils/axiosInstance";
import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

import styles from "./BaseForm.module.scss";

const FIELDS_WITH_OTHER = [
	"pronouns",
	"ethnicity",
	"school",
	"major",
	"experienced_technologies",
	"dietary_restrictions",
];

interface BaseFormProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
	className?: string;
}

export default function BaseForm({
	applicationType,
	applyPath,
	className,
	children,
}: PropsWithChildren<BaseFormProps>) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [sessionExpired, setSessionExpired] = useState(false);

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
				.filter((value) => value !== "other" && value !== "Other");

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
			method="post"
			encType="multipart/form-data"
			className={className}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				name="application_type"
				value={applicationType}
				readOnly
				hidden
			/>
			{children}
			{sessionExpired && sessionExpiredMessage}
			<button
				type="submit"
				className={styles.applyButton}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Submitting..." : "Submit Application"}
			</button>
		</form>
	);
}
