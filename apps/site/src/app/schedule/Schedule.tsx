import { getSchedule } from "./getSchedule";
import ScheduleView from "./ScheduleView/ScheduleView";

import styles from "./Schedule.module.scss";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

interface ScheduleProps {
	overlay?: boolean;
}

export default async function Schedule({ overlay = false }: ScheduleProps) {
	const schedule = await getSchedule();

	const scheduleWindow = (
		<div className={overlay ? styles.overlayWindowWrapper : styles.windowWrapper}>
			<RetroWindow
				title="Schedule"
				framedContent
				closeHref="/"
				snapBack={!overlay}
			>
				<ScheduleView schedule={schedule} />
			</RetroWindow>
		</div>
	);

	if (overlay) {
		return scheduleWindow;
	}

	return (
		<div className={styles.backgroundWrapper}>
			{scheduleWindow}
		</div>
	);
}
