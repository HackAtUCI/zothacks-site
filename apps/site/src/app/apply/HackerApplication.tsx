import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import EventInfoCard from "./EventInfoCard";
import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<BaseForm applyPath="/api/user/apply" applicationType="Hacker">
			<div className={styles.container}>
				<EventInfoCard />
				<ApplicationForm />
			</div>
		</BaseForm>
	);
}
