import Image from "next/image";

import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import EventInfoCard from "./EventInfoCard";
import hackerAnteater from "@/assets/images/hacker-anteater.png";
import background from "@/assets/images/application-background.png";

import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	return (
		<div className={styles.container}>
			<Image
				src={background}
				alt="tree background"
				className={styles.background}
			/>
			<BaseForm
				applyPath="/api/user/apply"
				applicationType="Hacker"
				className={styles.formContainer}
			>
				<Image src={hackerAnteater} alt="hacker anteater" />
				<h1 className={styles.title}>ZotHacks 2025: Hacker Application</h1>
				<EventInfoCard />
				<ApplicationForm />
			</BaseForm>
		</div>
	);
}
