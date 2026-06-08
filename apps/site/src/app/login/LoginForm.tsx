"use client";

import { useState } from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./Login.module.scss";

type LoginFormProps = {
	returnTo: string;
	overlay?: boolean;
};

export default function LoginForm({
	returnTo,
	overlay = false,
}: LoginFormProps) {
	const [email, setEmail] = useState("");

	const normalizedEmail = email.trim().toLowerCase();
	const isUciEmail = normalizedEmail.endsWith("@uci.edu");
	const action = isUciEmail
		? `/api/user/login?return_to=${encodeURIComponent("https://zothacks.com/auth")}`
		: "/api/user/login";

	return (
		<div className={styles.windowWrapper}>
			<RetroWindow
				title="Login"
				closeHref="/"
				snapBack={!overlay}
			>
				<form method="post" action={action} className={styles.content}>
					<p className={styles.description}>
						Only UCI students are eligible to be a hacker at ZotHacks.
						<br />
						Please login with SSO, using your school email address.
					</p>

					<div className={styles.field}>
						<label htmlFor="email" className={styles.label}>
							Email<span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className={styles.input}
							value={normalizedEmail}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{isUciEmail && (
							<input type="hidden" name="return_to" value={returnTo} />
						)}
					</div>

					<div className={styles.actions}>
						<PrimaryButton type="submit" className={styles.continueButton}>
							Continue
						</PrimaryButton>
					</div>
				</form>
			</RetroWindow>
		</div>
	);
}
