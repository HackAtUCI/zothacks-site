export default function hasDeadlinePassed() {
	const deadline = new Date("2026-10-02T23:59:00-07:00");
	const now = new Date();

	return deadline < now;
}
