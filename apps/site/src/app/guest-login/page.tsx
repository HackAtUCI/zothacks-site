import { redirect } from "next/navigation";
import getUserIdentity from "@/lib/utils/getUserIdentity";

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
	const email = searchParams?.email;
	const return_to = searchParams?.return_to ?? "/apply-mentor";

	const newSearchParams = new URLSearchParams();
	if (return_to) {
		newSearchParams.append("return_to", return_to);
	}

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to);
	}

	return (
		<div className={styles.container}>
			{!email && (
				<form method="post" action="/api/guest/login">
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
							/>
							<input type="hidden" name="return_to" value={return_to} />
						</div>

						<p className={styles.subtitle}>
							UCI students will log in with UCI SSO. Please use your school
							email address if you have one.
						</p>
					</div>

					<button type="submit" className={styles.button}>
						Continue
					</button>
				</form>
			)}

			{email && (
				<form
					className={styles.form}
					method="post"
					action={`/api/guest/verify?${newSearchParams}`}
				>
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

			{/* {error === "invalid" && (
				<div className={styles.errorBanner}>
					Invalid passphrase. Please try again.
				</div>
			)} */}
		</div>
	);
}
