"use client";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./PortalDashboard.module.scss";

const confirmationMessage =
	"Are you sure? This will void your application and you will no longer be considered for ZotHacks 2026.";

export default function DeclineAcceptanceBox() {
	return (
		<form
			method="post"
			action="/api/user/decline-acceptance"
			className={styles.declineForm}
			onSubmit={(event) => {
				if (!confirm(confirmationMessage)) {
					event.preventDefault();
				}
			}}
		>
			<PrimaryButton type="submit" color="red" className={styles.declineButton}>
				I am no longer able to attend ZotHacks 2026
			</PrimaryButton>
		</form>
	);
}
