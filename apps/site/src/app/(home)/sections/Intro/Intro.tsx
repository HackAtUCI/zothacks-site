
import styles from "./Intro.module.scss";

export default function Intro() {
	return (
		<div className={styles.intro}>
			<div className={styles.introBox}>
				<h2 className={styles.header}>What is ZotHacks?</h2>
				<p className={styles.description}>
					ZotHacks is UC Irvine’s beginner-friendly hackathon, where students
					with minimal computer science experience will learn to build their
					first CS project. Through ZotHacks, we introduce these students to the
					world of hackathons and web development by providing technical
					workshops, strong mentorship, and free food!
				</p>
			</div>
		</div>
	);
}
