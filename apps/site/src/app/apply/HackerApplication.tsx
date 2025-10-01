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
			<BaseForm applyPath="/api/user/apply" applicationType="Hacker">
				<Image
					src={background}
					alt="tree background"
					className={styles.background}
				/>
				<div className={styles.formContainer}>
					<Image src={hackerAnteater} alt="hacker anteater" />
					<h1 className={styles.title}>ZotHacks 2025: Hacker Application</h1>
					<EventInfoCard />
					<ApplicationForm />
				</div>
			</BaseForm>
		</div>
	);
}
