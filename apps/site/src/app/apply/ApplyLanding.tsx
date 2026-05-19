import Link from "next/link";

export default function ApplyLanding() {
	return (
		<main>
			<h1>Are you applying as a Hacker or Mentor?</h1>
			<nav>
				<Link href="/apply/hacker">Hacker</Link>
				<Link href="/mentor">Mentor</Link>
			</nav>
		</main>
	);
}
