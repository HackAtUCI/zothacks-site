import RetroWindow from "@/components/RetroWindow/RetroWindow";

import type { PortalState } from "./portalState";
import styles from "./PortalDashboard.module.scss";

type PortalTextBoxProps = {
	portalState: PortalState;
};

export default function PortalTextBox({ portalState }: PortalTextBoxProps) {
	return (
		<section className={styles.messageWindow}>
			<RetroWindow title={portalState.panelTitle} framedContent>
				<p className={styles.message}>{portalState.message}</p>
			</RetroWindow>
		</section>
	);
}
