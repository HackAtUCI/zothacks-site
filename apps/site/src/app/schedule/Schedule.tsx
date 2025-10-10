import { getSchedule } from "./getSchedule";
import ScheduleView from "./ScheduleView/ScheduleView";

import styles from "./Schedule.module.scss";

export default async function Schedule() {
	const schedule = await getSchedule();
	return (
		<div className={styles.backgroundWrapper}>
			<ScheduleView schedule={schedule} />
		</div>
	);
}
