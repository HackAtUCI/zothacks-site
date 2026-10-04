"use client";
import { useEffect, useRef, useState } from "react";

import CountdownBanner from "../CountdownBanner/CountdownBanner";
import OptionTabs from "../OptionTabs/OptionTabs";
import TimeGrid from "../TimeGrid/TimeGrid";
import EventInfo from "../EventInfo/EventInfo";
import { ScheduleScrollRail } from "../ScheduleScrollRail";

import styles from "./ScheduleView.module.scss";

interface ScheduleProps {
	schedule: Array<any>;
}

const ScheduleView: React.FC<ScheduleProps> = ({ schedule }) => {
	const [selectedDay, setSelectedDay] = useState("Fri");
	const [selectedEvent, setSelectedEvent] = useState(schedule[0][0]);

	const scheduleFlat = schedule.flat();
	const friday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
			new Date(new Date("2026-10-17T00:00:00").toUTCString()).getTime(),
	);
	const saturday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2026-10-18T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2026-10-17T00:00:00").toUTCString()).getTime(),
	);
	const sunday = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2026-10-19T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2026-10-18T00:00:00").toUTCString()).getTime(),
	);

	const dayMap: Record<string, any[]> = {
		Fri: friday,
		Sat: saturday,
		Sun: sunday,
	};
	const handleDaySelect = (day: string) => {
		setSelectedDay(day);
		setSelectedEvent(dayMap[day][0]);
	};

	const timeGridScrollRef = useRef<HTMLDivElement>(null);
	const getScrollable = () => timeGridScrollRef.current ;

	const handleJumpToEvent = (event: any) => {
		const day = Object.keys(dayMap).find((d) => dayMap[d].includes(event));
		if (!day) return;
		setSelectedDay(day);
		setSelectedEvent(event);
	};

	return (
		<div className={styles.scheduleContainer}>
			<CountdownBanner events={scheduleFlat} onEventClick={handleJumpToEvent}/>
			<div className={styles.schedulePanel}>
				<div className={styles.dayTabs}>
					<OptionTabs selectedDay={selectedDay} selectDay={handleDaySelect} />
				</div>
				<div className={styles.scheduleContent}>
					<div className={styles.scheduleHeader}>
						<p className={styles.headerTime}>Time</p>
						<p className={styles.headerEvents}>Events</p>
						<p className={styles.headerInfo}>Event Info</p>
					</div>

					<div className={styles.scheduleInfo}>
						<div className={styles.schedulePanels}>
							<div className={styles.timeGridColumn}>
								<div className={styles.timeGridScroll} ref={timeGridScrollRef}>
									<TimeGrid
										selectedDay={selectedDay}
										friday={friday}
										saturday={saturday}
										sunday={sunday}
										selectedEvent={selectedEvent}
										onSelect={setSelectedEvent}
									/>
								</div>
							</div>

							<div className={styles.eventInfoScroll}>
								<EventInfo event={selectedEvent} />
							</div>
						</div>
						<ScheduleScrollRail getScrollable={getScrollable} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleView;
