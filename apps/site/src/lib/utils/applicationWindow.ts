export const APPLICATION_OPEN_DATE = new Date("2026-09-21T00:00:00-07:00");
export const APPLICATION_DEADLINE = new Date("2026-10-02T23:59:00-07:00");

export type ApplicationWindow = "before-open" | "open" | "closed";

export function hasApplicationsOpened(now = new Date()) {
	return APPLICATION_OPEN_DATE <= now;
}

export function hasDeadlinePassed(now = new Date()) {
	return APPLICATION_DEADLINE < now;
}

export function getApplicationWindow(now = new Date()): ApplicationWindow {
	if (!hasApplicationsOpened(now)) return "before-open";
	if (hasDeadlinePassed(now)) return "closed";

	return "open";
}
