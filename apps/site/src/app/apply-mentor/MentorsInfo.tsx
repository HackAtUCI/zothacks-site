import styles from "./MentorsInfo.module.scss";

export default async function MentorsInfo() {
	return (
		<div className={styles.infoWrapper}>
			<div className={styles.infoCard}>
				<div className={styles.infoRow}>
					<h3>Who You Are:</h3>
					<p>
						Someone who wants to help beginners participate in their first
						hackathon!
					</p>
				</div>
				<div className={styles.infoRow}>
					<h3>When:</h3>
					<p>
						Nov. 7-9, 2025 (2-day weekend event and mandatory attendance on
						Friday from 7-10 pm for team formation, project ideation, and
						answering questions - not overnight)
					</p>
				</div>
				<div className={styles.infoRow}>
					<h3>Where:</h3>
					<p>UC Irvine</p>
				</div>
			</div>
			<div className={styles.deadlinesCard}>
				<div className={styles.countdown}>
					<span className={styles.count}>XX</span>
					<span className={styles.caption}>Days Left to Apply</span>
				</div>
				<div className={styles.deadlines}>
					<p>
						<strong>Application Due Date: </strong>Oct. 15, 2025
					</p>
					<p>
						<strong>Decisions Released: </strong>Oct. 31, 2025
					</p>
					<span className={styles.note}>
						If you have any questions about ZotHacks or being a mentor, please
						send an email to hack@uci.edu.
					</span>
				</div>
			</div>
		</div>
	);
}
