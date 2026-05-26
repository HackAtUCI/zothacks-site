import { getSchedule } from "./getSchedule";
import ScheduleView from "./ScheduleView/ScheduleView";

import styles from "./Schedule.module.scss";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

export default async function Schedule() {
	const schedule = await getSchedule();
	return (
		<div className={styles.backgroundWrapper}>
			<div className={styles.windowWrapper}>
                <RetroWindow title="Schedule" framedContent>
                    <ScheduleView schedule={schedule} />
                </RetroWindow>
            </div>
		</div>
	);
}
