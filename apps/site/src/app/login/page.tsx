import { redirect } from "next/navigation";

import getUserIdentity from "@/lib/utils/getUserIdentity";
import LoginForm from "./LoginForm";

import styles from "./Login.module.scss";

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

	// client-side form determines whether to include return_to based on email domain

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to);
	}

	return (
		<div className={styles.container}>
			{!email && <LoginForm returnTo={return_to} />}
		</div>
	);
}
