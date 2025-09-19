import styles from "./Mentors.module.scss";
import MentorsTitle from "./MentorsTitle";

export default async function Mentors() {
	return (
		<>
			<div className={styles.background}>
				<MentorsTitle />
			</div>
		</>
	);
}
