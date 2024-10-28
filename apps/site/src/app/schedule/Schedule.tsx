import { PortableText } from "@portabletext/react";
import ClipboardSchedule from "./ClipboardSchedule";
import { getSchedule } from "./getSchedule";

import styles from "./Schedule.module.scss";
import ScheduleTimer from "./ScheduleTimer";

export default async function Schedule() {
	const schedule = await getSchedule();
	// console.log(schedule[0])
	return <ScheduleTimer schedule={schedule}></ScheduleTimer>;
}
