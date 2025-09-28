import styles from "./Mentors.module.scss";
import MentorsTitle from "./MentorsTitle";
import MentorsInfo from "./MentorsInfo";
import MentorsForm from "./MentorsForm";

export default async function Mentors() {
	return (
		<>
			<div className={styles.background}>
				<MentorsTitle />
				<MentorsInfo />
				<MentorsForm />
			</div>
		</>
	);
}
