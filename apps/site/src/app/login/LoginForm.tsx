"use client";

import { useMemo, useState } from "react";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./Login.module.scss";

type LoginFormProps = {
	returnTo: string;
};

export default function LoginForm({ returnTo }: LoginFormProps) {
	const [email, setEmail] = useState("");

	const isUciEmail = useMemo(() => {
		const trimmed = email.trim().toLowerCase();
		return trimmed.endsWith("@uci.edu");
	}, [email]);

	const action = useMemo(() => {
		return isUciEmail
			? `/api/user/login?return_to=${encodeURIComponent("https://zothacks.com/auth")}`
			: "/api/user/login";
	}, [isUciEmail]);

	return (
		<form method="post" action={action} className={styles.formTag}>
			<div className={styles.form}>
				<h1 className={styles.title}>Log In</h1>

				<div className={styles.inputSection}>
					<label htmlFor="email" className={styles.label}>
						Email*
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className={styles.input}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{isUciEmail && (
						<input type="hidden" name="return_to" value={returnTo} />
					)}
				</div>

				<p className={styles.subtitle}>
					UCI students will log in with UCI SSO. Please use your school email
					address if you have one.
				</p>
			</div>

			<PrimaryButton>Continue</PrimaryButton>
		</form>
	);
}
