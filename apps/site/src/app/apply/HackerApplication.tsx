import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import EventInfoCard from "./EventInfoCard";
import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<BaseForm applyPath="/api/user/apply" applicationType="Hacker">
			<div className={styles.container}>
				<h1 className={styles.title}>ZotHacks 2025: Hacker Application</h1>
				<EventInfoCard />
				<ApplicationForm />
			</div>
		</BaseForm>
	);
}
