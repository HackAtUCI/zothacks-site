import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import EventInfoCard from "./EventInfoCard";
import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<div className={styles.container}>
			<BaseForm applyPath="/api/user/mentor" applicationType="Mentor">
				<EventInfoCard />
				<ApplicationForm />
			</BaseForm>
		</div>
	);
}
