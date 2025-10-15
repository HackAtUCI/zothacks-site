"use client";

import { useCallback, useState } from "react";

import axiosInstance from "@/lib/utils/axiosInstance";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "../login/Login.module.scss";

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
		<form
			className={`${styles.form} ${styles.formTag}`}
			method="post"
			onSubmit={onSubmit}
		>
			<input type="hidden" name="email" value={email} />
			<input type="hidden" name="return_to" value={returnTo} />

			<label htmlFor="passphrase" className={styles.label}>
				Enter Passphrase
			</label>
			<input
				id="passphrase"
				name="passphrase"
				type="text"
				required
				className={styles.input}
				placeholder="Enter passphrase here..."
			/>

			<small className={styles.passphraseDescription}>
				A login passphrase was sent to your email. Please enter the passphrase.
			</small>
			<span className={styles.redText}>
				If you cannot find the passphrase, please check your spam. If the email
				is still missing, try again later, use a different email, or contact us
				at contact@zothacks.com for assistance.
			</span>

			<PrimaryButton
				type="submit"
				className={styles.button}
				disabled={submitting}
			>
				{submitting ? "Verifying..." : "Continue"}
			</PrimaryButton>

			{showError && (
				<div className={styles.redText}>
					Invalid passphrase. Please try again.
				</div>
			)}
		</form>
	);
}
