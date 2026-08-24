"use client";

import { useState } from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import { ParticipantRole } from "@/lib/userRecord";
import type { Identity } from "@/lib/utils/useUserIdentity";

import {
	canDeclineAcceptance,
	canSubmitLateArrival,
	resolvePortalState,
	type PortalState,
} from "./portalState";
import CheckInQrBox from "./CheckInQrBox";
import CompletedTasksBox from "./CompletedTasksBox";
import DeclineAcceptanceBox from "./DeclineAcceptanceBox";
import LateArrivalBox from "./LateArrivalBox";
import PortalStatusBox from "./PortalStatusBox";
import PortalTextBox from "./PortalTextBox";
import RsvpBox from "./RsvpBox";
import WaiverBox from "./WaiverBox";
import styles from "./PortalDashboard.module.scss";

type PortalDashboardProps = {
	identity: Identity;
};

function getApplicationRole(identity: Identity): "Hacker" | "Mentor" {
	return identity.roles.includes(ParticipantRole.Mentor) ? "Mentor" : "Hacker";
}

function AcceptedActions({
	portalState,
	identity,
	applicationRole,
}: {
	portalState: PortalState;
	identity: Identity;
	applicationRole: "Hacker" | "Mentor";
}) {
	if (!portalState.acceptedStage) {
		return null;
	}

	if (portalState.acceptedStage === "attending") {
		return <CompletedTasksBox />;
	}

	return (
		<>
			{portalState.acceptedStage === "needs-waiver" && <WaiverBox />}
			{portalState.acceptedStage === "needs-rsvp" && (
				<RsvpBox applicationRole={applicationRole} />
			)}
			{portalState.acceptedStage === "confirmed" && <CompletedTasksBox />}
		</>
	);
}

export default function PortalDashboard({ identity }: PortalDashboardProps) {
	const portalState = resolvePortalState(identity);
	const applicationRole = getApplicationRole(identity);
	const [isLateFormOpen, setIsLateFormOpen] = useState(false);
	const showLateArrival = canSubmitLateArrival(identity);
	const showOpenLateArrivalForm = showLateArrival && isLateFormOpen;

	return (
		<main className={styles.container}>
			<div className={styles.window}>
				<RetroWindow title="Portal" framedContent snapBack closeHref="/portal">
					<div className={styles.portalContent}>
						{portalState.acceptedStage === "confirmed" && identity.uid && (
							<CheckInQrBox uid={identity.uid} />
						)}
						<PortalStatusBox
							applicationRole={applicationRole}
							portalState={portalState}
						/>
						<PortalTextBox portalState={portalState} />
						{!showOpenLateArrivalForm && (
							<AcceptedActions
								applicationRole={applicationRole}
								portalState={portalState}
								identity={identity}
							/>
						)}
						{showLateArrival && (
							<LateArrivalBox
								applicationRole={applicationRole}
								isOpen={isLateFormOpen}
								onOpenChange={setIsLateFormOpen}
							/>
						)}
						{!showOpenLateArrivalForm && canDeclineAcceptance(identity) && (
							<DeclineAcceptanceBox />
						)}
					</div>
				</RetroWindow>
			</div>
		</main>
	);
}
