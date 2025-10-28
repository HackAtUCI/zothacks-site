import Image from "next/image";
import { redirect } from "next/navigation";

import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import EventInfoCard from "./EventInfoCard";
import hackerAnteater from "@/assets/images/hacker-anteater.png";
import background from "@/assets/images/application-background.png";

import getUserIdentity from "@/lib/utils/getUserIdentity";
import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import ApplicationsClosed from "./ApplicationsClosed";

import styles from "./HackerApplication.module.scss";

export default async function HackerApplication() {
	const { status, uid } = await getUserIdentity();
	const deadlinePassed = hasDeadlinePassed();

	if (status) {
		redirect("/portal");
	}

	if (!uid) {
		redirect("/login");
	}

	return (
		<div className={styles.container}>
			<Image
				src={background}
				alt="tree background"
				className={styles.background}
			/>
			{deadlinePassed ? (
				<ApplicationsClosed />
			) : (
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
			)}
		</div>
	);
}
