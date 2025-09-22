import styles from "./login.module.scss";
import { redirect } from "next/navigation";
import getUserIdentity from "@/lib/utils/getUserIdentity";

export default async function Login({
	searchParams,
}: {
	searchParams?: {
		email?: string;
		return_to?: string;
	};
}) {
	const email = searchParams?.email;
	const return_to = searchParams?.return_to ?? "/apply-mentor";
	// const error = searchParams?.error;

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
			<h1 className={styles.title}>Log In</h1>
			<p className={styles.subtitle}>
				{!email ? (
					"Enter your email to receive a passphrase."
				) : (
					<>
						We emailed a passphrase to <b>{email}</b>. Enter it below.
					</>
				)}
			</p>

			{/* {error === "invalid" && (
				<div className={styles.errorBanner}>
					Invalid passphrase. Please try again.
				</div>
			)} */}

			{!email ? (
				<form className={styles.form} method="post" action="/api/guest/login">
					<label htmlFor="email" className={styles.label}>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className={styles.input}
						placeholder="you@example.com"
					/>
					<input type="hidden" name="return_to" value={return_to} />

					<button type="submit" className={styles.button}>
						Send Passphrase
					</button>
				</form>
			) : (
				<form
					className={styles.form}
					method="post"
					action={`/api/guest/verify?${newSearchParams}`}
				>
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

					<div className={styles.switchLink}>
						<a href={`/login?return_to=${encodeURIComponent(return_to)}`}>
							&larr; Use a different email
						</a>
					</div>
				</form>
			)}
		</div>
	);
}
