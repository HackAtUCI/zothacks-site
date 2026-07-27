import { Decision, Status } from "@/lib/userRecord";
import type { Identity } from "@/lib/utils/useUserIdentity";

export type PortalStatusTone =
	| "submitted"
	| "accepted"
	| "waitlisted"
	| "rejected"
	| "voided";

export type PortalState = {
	tone: PortalStatusTone;
	statusLabel: string;
	panelTitle: string;
	message: string;
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
			"We will open up spots from our waitlist on [DATE + Time] on a first come first serve basis.\n\nPlease check back on the portal to RSVP + fill out the waiver then. Thank you for your patience.",
	},
	waitlisted: {
		tone: "waitlisted",
		statusLabel: "Application Waitlisted",
		panelTitle: "Waitlist Disclaimer",
		message:
			"We will open up spots from our waitlist on [DATE + Time] on a first come first serve basis.\n\nPlease check back on the portal to RSVP + fill out the waiver then. Thank you for your patience.",
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
			"Your application has been voided.\n\nFor more information, contact us at hack@uci.edu.",
	},
};

export function resolvePortalState(identity: Identity): PortalState {
	const { decision, status } = identity;

	if (decision === Decision.Voided) {
		return portalStateByTone.voided;
	}

	if (decision === Decision.Rejected) {
		return portalStateByTone.rejected;
	}

	if (
		decision === Decision.Waitlisted ||
		status === Status.Waitlisted ||
		status === Status.Queued
	) {
		return portalStateByTone.waitlisted;
	}

	if (
		decision === Decision.Accepted ||
		status === Status.Reviewed ||
		status === Status.WaiverSigned ||
		status === Status.Confirmed ||
		status === Status.Attending
	) {
		return portalStateByTone.accepted;
	}

	return portalStateByTone.submitted;
}
