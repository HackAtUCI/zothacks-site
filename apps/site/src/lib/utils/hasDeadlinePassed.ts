export default function hasDeadlinePassed() {
	const deadline = new Date("2025-10-28T00:00:59");
	const now = new Date();

	return now > deadline;
}
