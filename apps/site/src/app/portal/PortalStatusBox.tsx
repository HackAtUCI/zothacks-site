import RetroWindow from "@/components/RetroWindow/RetroWindow";

import type { PortalState } from "./portalState";
import styles from "./PortalDashboard.module.scss";

type PortalStatusBoxProps = {
	portalState: PortalState;
};

export default function PortalStatusBox({ portalState }: PortalStatusBoxProps) {
	return (
		<section className={styles.statusWindow} aria-labelledby="portal-status-title">
			<RetroWindow title="Status" framedContent>
				<div className={styles.statusContent}>
					<h1 id="portal-status-title" className={styles.statusHeading}>
						Hacker Application Status
					</h1>
					<div className={styles.statusRows}>
						<div className={styles[portalState.tone]}>
							{portalState.statusLabel}
						</div>
					</div>
				</div>
			</RetroWindow>
		</section>
	);
}
