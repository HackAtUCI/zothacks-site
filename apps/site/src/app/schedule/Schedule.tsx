import { getSchedule } from "./getSchedule";
import ScheduleView from "./ScheduleView/ScheduleView";

import styles from "./Schedule.module.scss";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import ScheduleMotion from "./ScheduleMotion";

interface ScheduleProps {
	overlay?: boolean;
}

export default async function Schedule({ overlay = false }: ScheduleProps) {
	const schedule = await getSchedule();

	const scheduleWindow = (
		<ScheduleMotion
			overlay={overlay}	
			className={overlay ? styles.overlayWindowWrapper : styles.windowWrapper}
		>
			<RetroWindow
				title="Schedule"
				framedContent
				closeHref="/"
			>
				<ScheduleView schedule={schedule} />
			</RetroWindow>
		</ScheduleMotion>
	);

	if (overlay) {
		return scheduleWindow;
	}

	return <div className={styles.backgroundWrapper}>{scheduleWindow}</div>;
}
