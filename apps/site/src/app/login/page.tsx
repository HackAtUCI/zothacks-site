import { redirect } from "next/navigation";

import getUserIdentity from "@/lib/utils/getUserIdentity";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "../guest-login/Login.module.scss";

export default async function Login({
	searchParams,
}: {
	searchParams?: {
		email?: string;
		return_to?: string;
	};
}) {
	const email = searchParams?.email;
	const return_to = searchParams?.return_to ?? "/apply";

	const newSearchParams = new URLSearchParams();
	if (return_to) {
		newSearchParams.append("return_to", return_to);
	}
	const newSearchParamsString = newSearchParams.toString();

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to);
	}

	return (
		<div className={styles.container}>
			{!email && (
				<form
					method="post"
					action={`/api/user/login?return_to=${encodeURIComponent("https://zothacks.com/auth")}`}
					className={styles.formTag}
				>
					<div className={styles.form}>
						<h1 className={styles.title}>Log In UCI</h1>

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

						{/* <p className={styles.subtitle}>
							UCI students will log in with UCI SSO. Please use your school
							email address if you have one.
						</p> */}
					</div>

					<PrimaryButton>Continue</PrimaryButton>
				</form>
			)}
		</div>
	);
}
