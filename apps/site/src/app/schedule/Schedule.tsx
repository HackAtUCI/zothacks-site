import Image from "next/image";

import { getSchedule } from "./getSchedule";
import ScheduleTimer from "./ScheduleTimer/ScheduleTimer";

import background from "@/assets/images/schedule-background.svg";

import styles from "./Schedule.module.scss";

export default async function Schedule() {
	const schedule = await getSchedule();
	return (
		<>
			<Image
				src={background}
				alt="cloud background"
				className={styles.background}
			/>
			<ScheduleTimer schedule={schedule} />
		</>
	);
}
