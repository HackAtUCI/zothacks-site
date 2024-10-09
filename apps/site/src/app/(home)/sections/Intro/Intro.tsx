import styles from "./Intro.module.scss";

export default function Intro() {
	return (
		<div className={styles.intro}>
			<h2 className={styles.header}>What is ZotHacks?</h2>
			<p className={styles.description}>
				ZotHacks is a 12-hour hackathon designed for beginners where students
				with minimal computer science experience will learn to build their first
				CS project. Through ZotHacks, we introduce these students to the world
				of hackathons and web development by providing technical workshops,
				dedicated mentors for every team, and free food! We encourage applicants
				from all backgrounds, including underrepresented minorities, majors, or
				genders to apply!
			</p>
		</div>
	);
}
