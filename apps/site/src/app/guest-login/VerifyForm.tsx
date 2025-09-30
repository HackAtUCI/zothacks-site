"use client";

import { useCallback, useState } from "react";
import axiosInstance from "@/lib/utils/axiosInstance";

import styles from "./Login.module.scss";

type VerifyFormProps = {
	email: string;
	returnTo: string;
	newSearchParamsString: string;
};

export default function VerifyForm({
	email,
	returnTo,
	newSearchParamsString,
}: VerifyFormProps) {
	const [showError, setShowError] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setShowError(false);
			setSubmitting(true);

			const formData = new FormData(event.currentTarget);

			try {
				await axiosInstance.post(
					`/api/guest/verify?${newSearchParamsString}`,
					formData,
				);
				window.location.href = returnTo;
			} catch (error: unknown) {
				setShowError(true);
				setSubmitting(false);
			}
		},
		[returnTo, newSearchParamsString],
	);

	return (
		<form className={styles.form} method="post" onSubmit={onSubmit}>
			<h1 className={styles.title}>Enter Passphrase</h1>

			<input type="hidden" name="email" value={email} />
			<input type="hidden" name="return_to" value={returnTo} />

			<label htmlFor="passphrase" className={styles.label}>
				Passphrase
			</label>
			<input
				id="passphrase"
				name="passphrase"
				type="text"
				required
				className={styles.input}
				placeholder="123456"
			/>

			<button type="submit" className={styles.button} disabled={submitting}>
				{submitting ? "Verifying..." : "Verify & Continue"}
			</button>

			{showError && (
				<div className={styles.errorText}>
					Invalid passphrase. Please try again.
				</div>
			)}
		</form>
	);
}
