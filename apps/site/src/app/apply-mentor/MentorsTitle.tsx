import styles from "./MentorsTitle.module.scss";

export default async function MentorsTitle() {
	return (
		<div>
			<h1 className={styles.title}>Mentor Applications Are Now Open</h1>
			<p className={styles.description}>
				Hello! Thank you for your interest in becoming a mentor at ZotHacks
				2025! Your support is vital to helping us continue our mission to
				promote, educate, and enhance the community around us by giving students
				the platform to learn and create technology.
			</p>
		</div>
	);
}
