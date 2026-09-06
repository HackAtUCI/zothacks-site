import { ParticipantRole, Status } from "@/lib/userRecord";
import type { Identity } from "@/lib/utils/useUserIdentity";

export type PortalStatusTone =
	| "submitted"
	| "accepted"
	| "waitlisted"
	| "rejected"
	| "voided";

export type AcceptedPortalStage =
	| "needs-waiver"
	| "needs-rsvp"
	| "confirmed"
	| "attending";

export type PortalState = {
	tone: PortalStatusTone;
	statusLabel: string;
	panelTitle: string;
	message: string;
	acceptedStage?: AcceptedPortalStage;
};

const portalStateByTone: Record<PortalStatusTone, PortalState> = {
	submitted: {
		tone: "submitted",
		statusLabel: "Application Submitted",
		panelTitle: "Application Submitted",
		message:
			"Thank you for applying! We will get back to you by the end of Fall Quarter Week 2!",
	},
	accepted: {
		tone: "accepted",
		statusLabel: "Application Accepted",
		panelTitle: "Application Accepted!",
		message:
			"Congratulations! You have been chosen to participate in ZotHacks 2026!\n\nPlease make sure to fill out our waiver and RSVP by 10/8 @ 11:59PM. Look out for any future emails from us (zothacks2026@gmail.com) and stay updated with our event on Instagram (@hackatuci)!",
		acceptedStage: "needs-waiver",
	},
	waitlisted: {
		tone: "waitlisted",
		statusLabel: "Application Waitlisted",
		panelTitle: "Waitlist Disclaimer",
		message:
			"We will open up spots from our waitlist on 10/9 @ 11:59PM on a first come first serve basis.\n\nPlease check back on the portal to RSVP + fill out the waiver then. Thank you for your patience.",
	},
	rejected: {
		tone: "rejected",
		statusLabel: "Application Rejected",
		panelTitle: "Rejected Disclaimer",
		message:
			"Hack at UCI has officially reviewed all applications for ZotHacks 2026. Unfortunately, we have decided to move forward with other applicants.\n\nThank you for applying to ZotHacks 2026! Please follow our Instagram (@hackatuci) to stay updated on our next hackathons!",
	},
	voided: {
		tone: "voided",
		statusLabel: "Application Voided",
		panelTitle: "Voided Disclaimer",
		message:
			"Your application has been voided.\n\nFor more information, contact us at zothacks2026@gmail.com.",
	},
};

const acceptedPortalStateByStage: Record<AcceptedPortalStage, PortalState> = {
	"needs-waiver": portalStateByTone.accepted,
	"needs-rsvp": {
		...portalStateByTone.accepted,
		acceptedStage: "needs-rsvp",
	},
	confirmed: {
		...portalStateByTone.accepted,
		acceptedStage: "confirmed",
	},
	attending: {
		...portalStateByTone.accepted,
		acceptedStage: "attending",
	},
};

function resolveAcceptedStage(status: Identity["status"]): AcceptedPortalStage {
	if (status === Status.Attending) {
		return "attending";
	}

	if (status === Status.Confirmed) {
		return "confirmed";
	}

	if (status === Status.WaiverSigned) {
		return "needs-rsvp";
	}

	return "needs-waiver";
}

export function resolvePortalState(identity: Identity): PortalState {
	const { status } = identity;

	if (status === Status.Voided) {
		return portalStateByTone.voided;
	}

	if (status === Status.Rejected) {
		return portalStateByTone.rejected;
	}

	if (
		status === Status.Accepted ||
		status === Status.WaiverSigned ||
		status === Status.Confirmed ||
		status === Status.Attending
	) {
		return acceptedPortalStateByStage[resolveAcceptedStage(status)];
	}

	if (status === Status.Waitlisted || status === Status.Queued) {
		return portalStateByTone.waitlisted;
	}

	return portalStateByTone.submitted;
}

const declineableStatuses: ReadonlySet<string> = new Set([
	Status.Accepted,
	Status.WaiverSigned,
	Status.Confirmed,
]);

export function canDeclineAcceptance(identity: Identity): boolean {
	const isDeclineableRole =
		identity.roles.includes(ParticipantRole.Hacker) ||
		identity.roles.includes(ParticipantRole.Mentor);
	const status = identity.status;

	return (
		identity.roles.includes(ParticipantRole.Applicant) &&
		isDeclineableRole &&
		status !== null &&
		declineableStatuses.has(status)
	);
}

/**
 * Only confirmed applicants may submit a late-arrival request. RSVP is what
 * sets status to CONFIRMED, including waitlisted applicants who claimed a
 * spot without their original decision changing.
 */
export function canSubmitLateArrival(identity: Identity): boolean {
	return (
		identity.roles.includes(ParticipantRole.Applicant) &&
		identity.status === Status.Confirmed
	);
}
