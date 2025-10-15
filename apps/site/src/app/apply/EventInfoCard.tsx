import Link from "next/link";
import styles from "./EventInfoCard.module.scss";

export default function EventInfoCard() {
	return (
		<div className={styles.eventInfoWrapper}>
			<div className={styles.eventInfoBorder} />
			<div className={styles.eventInfoCard}>
				<h2 className={styles.title}>Event Information</h2>
				<p className={styles.line}>
					<span className={styles.label}>What:</span>
					<span className={styles.value}>
						Beginner-exclusive hackathon for UCI students of any year and any
						major
					</span>
				</p>
				<p className={styles.line}>
					<span className={styles.label}>When:</span>
					<span className={styles.value}>
						November 7th-9th, 2025 (weekend event — not overnight)
					</span>
				</p>
				<p className={styles.line}>
					<span className={styles.label}>Where:</span>
					<span className={styles.value}>DBH 6011</span>
				</p>
				<p className={styles.line}>
					<span className={styles.label}>Application Due Date:</span>
					<span className={styles.value}>Friday 10/27 11:59 PM</span>
				</p>
				<div className={styles.footnoteContainer}>
					<p className={styles.line}>
						<span className={styles.footnote}>
							** This is a limited capacity event, meaning not all applications
							will be accepted.
						</span>

						<span className={styles.footnote}>
							** Have project or hackathon experience? Consider applying to be a
							ZotHacks <Link href="/mentor">mentor</Link>! We will still take
							your application should you choose to apply as a hacker!
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
