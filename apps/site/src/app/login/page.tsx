import { redirect } from "next/navigation";
import getUserIdentity from "@/lib/utils/getUserIdentity";
import { Reddit_Mono } from "next/font/google";

const redditMono = Reddit_Mono({ subsets: ["latin"] });

import styles from "./Login.module.scss";

export default async function Login({
	searchParams,
}: {
	searchParams?: {
		step?: string;
		email?: string;
		return_to?: string;
		error?: string;
	};
}) {
	const step = searchParams?.step === "passphrase" ? "passphrase" : "email";
	const email = searchParams?.email ?? "";
	const return_to = searchParams?.return_to ?? "/";
	const error = searchParams?.error;

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to);
	}

	return (
		<div className={`${styles.container} ${redditMono.className}`}>
			{step === "email" && (
				<form className={styles.form} method="post" action="/api/guest/login">
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
						/>
						<input type="hidden" name="return_to" value={return_to} />
					</div>

					<p className={styles.subtitle}>
						UCI students will log in with UCI SSO. Please use your school email
						address if you have one.
					</p>
				</form>
			)}

			{step === "passphrase" && (
				<form className={styles.form} method="post" action="/api/guest/verify">
					<h1 className={styles.title}>Enter Passphrase</h1>

					<input type="hidden" name="email" value={email} />
					<input type="hidden" name="return_to" value={return_to} />

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

					<button type="submit" className={styles.button}>
						Verify & Continue
					</button>
				</form>
			)}

			<button type="submit" className={styles.button}>
				Continue
			</button>

			{error === "invalid" && (
				<div className={styles.errorBanner}>
					Invalid passphrase. Please try again.
				</div>
			)}
		</div>
	);
}
