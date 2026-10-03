"use client";

import { useState } from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import { Decision, ParticipantRole } from "@/lib/userRecord";
import type { Identity } from "@/lib/utils/useUserIdentity";

import {
	canClaimWaitlistSpot,
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
import WaitlistClaimBox from "./WaitlistClaimBox";
import styles from "./PortalDashboard.module.scss";

type PortalDashboardProps = {
	identity: Identity;
};

function getApplicationRole(identity: Identity): "Hacker" | "Mentor" {
	return identity.roles.includes(ParticipantRole.Mentor) ? "Mentor" : "Hacker";
}

function getDisplayPortalState(
	portalState: PortalState,
	applicationRole: "Hacker" | "Mentor",
	identity: Identity,
): PortalState {
	if (portalState.tone !== "accepted" || applicationRole !== "Mentor") {
		if (
			portalState.tone === "accepted" &&
			identity.decision === Decision.Waitlisted
		) {
			return {
				...portalState,
				message:
					"Congratulations! You have been chosen to participate in ZotHacks 2026!\n\nPlease make sure to fill out our waiver and RSVP by 10/9 @ 11:59PM or your spot will be forfeited. Look out for any future emails from us (zothacks2026@gmail.com) and stay updated with our event on Instagram (@hackatuci)!",
			};
		}

		return portalState;
	}

	return {
		...portalState,
		message:
			"Congratulations! You have been chosen to participate in ZotHacks 2026!\n\nPlease make sure to fill out our waiver and RSVP by 10/11 @ 11:59PM or your spot will be forfeited. Look out for any future emails from us (zothacks2026@gmail.com) and stay updated with our event on Instagram (@hackatuci)!",
	};
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
				<RsvpBox
					applicationRole={applicationRole}
					wasWaitlisted={identity.decision === Decision.Waitlisted}
				/>
			)}
			{portalState.acceptedStage === "confirmed" && <CompletedTasksBox />}
		</>
	);
}

export default function PortalDashboard({ identity }: PortalDashboardProps) {
	const portalState = resolvePortalState(identity);
	const applicationRole = getApplicationRole(identity);
	const displayPortalState = getDisplayPortalState(
		portalState,
		applicationRole,
		identity,
	);
	const [isLateFormOpen, setIsLateFormOpen] = useState(false);
	const showLateArrival = canSubmitLateArrival(identity);
	const showWaitlistClaim = canClaimWaitlistSpot(identity);
	const showOpenLateArrivalForm = showLateArrival && isLateFormOpen;
	const showPortalTextBox =
		portalState.acceptedStage !== "confirmed" &&
		portalState.acceptedStage !== "attending";

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
							portalState={displayPortalState}
						/>
						{showPortalTextBox &&
							(showWaitlistClaim ? (
								<WaitlistClaimBox portalState={displayPortalState} />
							) : (
								<PortalTextBox portalState={displayPortalState} />
							))}
						{!showOpenLateArrivalForm && (
							<AcceptedActions
								applicationRole={applicationRole}
								portalState={portalState}
								identity={identity}
							/>
						)}
						{showLateArrival && (
							<LateArrivalBox
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
