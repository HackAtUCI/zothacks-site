import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<div className={styles.container}>
			<div className={styles.eventInfoCard}>
				<h2 className={styles.title}>Event Information</h2>
				<p className={styles.line}>
					<span className={styles.label}>What:</span>
					<span className={styles.value}>
						Beginner Hackathon for 1st and 2nd year UCI students
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
					<span className={styles.value}>Friday 10/17 11:59 PM</span>
				</p>
				<p className={styles.line}>
					<span className={styles.footnote}>
						** This is a limited capacity event, meaning not all applications
						will be accepted.
					</span>
				</p>
				<p className={styles.line}>
					<span className={styles.footnote}>
						** 3rd years and up should consider applying to be a ZotHacks
						mentor. We will still take your application should you choose to
						apply as a hacker!
					</span>
				</p>
			</div>
		</div>
	);
}
