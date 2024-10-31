import { getSchedule } from "./getSchedule";

import styles from "./Schedule.module.scss";
import ScheduleTimer from "./ScheduleTimer";

export default async function Schedule() {
	const schedule = await getSchedule();
	return <ScheduleTimer schedule={schedule}></ScheduleTimer>;
}
