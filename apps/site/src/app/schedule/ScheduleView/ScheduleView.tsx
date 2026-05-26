"use client";
import { useEffect, useRef, useState } from "react";

import CountdownBanner from "../CountdownBanner/CountdownBanner"
import OptionTabs from "../OptionTabs/OptionTabs"
import TimeGrid from "../TimeGrid/TimeGrid";
import EventInfo from "../EventInfo/EventInfo";

import styles from "./ScheduleView.module.scss";

interface ScheduleProps {
	schedule: Array<any>;
}

const ScheduleView: React.FC<ScheduleProps> = ({ schedule }) => {
	const [selectedDay, setSelectedDay] = useState("Fri");
	const [selectedEvent, setSelectedEvent] = useState(schedule[0][0]);

	const scheduleFlat = schedule.flat();
	// TO DO: Fix dates for new year
	const friday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
			new Date(new Date("2025-11-08T00:00:00").toUTCString()).getTime(),
	);
	const saturday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2025-11-09T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2025-11-08T00:00:00").toUTCString()).getTime(),
	);
	const sunday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2025-11-10T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2025-11-09T00:00:00").toUTCString()).getTime(),
	);

	// Ref to set height to TimeGrid, not EventInfo
	const scheduleInfoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = scheduleInfoRef.current;
		if (!el) return;
		const grid = el.firstElementChild as HTMLElement;
		const info = el.lastElementChild as HTMLElement;
		const update = () => { info.style.maxHeight = `${grid.offsetHeight}px`; };
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [selectedDay]);


	return (
		<div className={styles.scheduleContainer}>
			<CountdownBanner/>
			<div className={styles.schedulePanel}>
				<div className={styles.dayTabs}>
					<OptionTabs selectedDay={selectedDay} selectDay={setSelectedDay} />
				</div>
				<div className={styles.scheduleContent}>
					<div className={styles.scheduleHeader}>
						<p className={styles.headerTime}>Time</p>
						<p className={styles.headerEvents}>Events</p>
						<p className={styles.headerInfo}>Event Info</p>
					</div>

					<div className={styles.scheduleInfo} ref={scheduleInfoRef}>
						<TimeGrid
							selectedDay={selectedDay}
							friday={friday}
							saturday={saturday}
							sunday={sunday}
							selectedEvent={selectedEvent}
							onSelect={setSelectedEvent}
						/>
						<EventInfo event={selectedEvent}  />
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default ScheduleView;
