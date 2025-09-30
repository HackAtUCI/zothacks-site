import EventInfoCard from "./EventInfoCard";
import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<div className={styles.container}>
			<EventInfoCard />
		</div>
	);
}
