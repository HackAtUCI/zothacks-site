import RetroWindow from "@/components/RetroWindow/RetroWindow";

import type { PortalState } from "./portalState";
import styles from "./PortalDashboard.module.scss";

type PortalTextBoxProps = {
	portalState: PortalState;
};

function MessageText({ message }: { message: string }) {
	const deadlineToken = "[DATE + TIME]";
	const [beforeDeadline, afterDeadline] = message.split(deadlineToken);

	if (afterDeadline == null) {
		return <>{message}</>;
	}

	return (
		<>
			{beforeDeadline}
			<span className={styles.messageHighlight}>{deadlineToken}</span>
			{afterDeadline}
		</>
	);
}

export default function PortalTextBox({ portalState }: PortalTextBoxProps) {
	return (
		<section className={styles.messageWindow}>
			<RetroWindow title={portalState.panelTitle} framedContent>
				<p className={styles.message}>
					<MessageText message={portalState.message} />
				</p>
			</RetroWindow>
		</section>
	);
}
