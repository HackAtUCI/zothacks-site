"use client";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import type { Identity } from "@/lib/utils/useUserIdentity";

import { resolvePortalState, type PortalState } from "./portalState";
import styles from "./PortalDashboard.module.scss";

type PortalDashboardProps = {
	identity: Identity;
};

function StatusPanel({ portalState }: { portalState: PortalState }) {
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

function MessagePanel({ portalState }: { portalState: PortalState }) {
	return (
		<section className={styles.messageWindow}>
			<RetroWindow title={portalState.panelTitle} framedContent>
				<p className={styles.message}>{portalState.message}</p>
			</RetroWindow>
		</section>
	);
}

export default function PortalDashboard({ identity }: PortalDashboardProps) {
	const portalState = resolvePortalState(identity);

	return (
		<main className={styles.container}>
			<div className={styles.window}>
				<RetroWindow title="Portal" framedContent snapBack closeHref="/portal">
					<div className={styles.portalContent}>
						<StatusPanel portalState={portalState} />
						<MessagePanel portalState={portalState} />
					</div>
				</RetroWindow>
			</div>
		</main>
	);
}
