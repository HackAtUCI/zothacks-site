import { redirect } from "next/navigation";

import getUserIdentity from "@/lib/utils/getUserIdentity";
import VerifyForm from "./VerifyForm";

import styles from "../login/Login.module.scss";

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
			{email && (
				<VerifyForm
					email={email}
					returnTo={return_to}
					newSearchParamsString={newSearchParamsString}
				/>
			)}
		</div>
	);
}
