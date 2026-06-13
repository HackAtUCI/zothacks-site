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

	const dayMap: Record<string, any[]> = {Fri: friday, Sat: saturday, Sun: sunday};
	const handleDaySelect = (day: string) => {
		setSelectedDay(day);
		setSelectedEvent(dayMap[day][0]);
	}

	const timeGridScrollRef = useRef<HTMLDivElement>(null);
	const timeGridRef = useRef<HTMLDivElement>(null);
	const eventInfoScrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tg = timeGridRef.current;
		const ei = eventInfoScrollRef.current;
		if (!tg || !ei) return;
		const update = () => {
			ei.style.maxHeight = `${tg.offsetHeight}px`;
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [selectedDay]);

	// Returns whichever panel is actively overflowing (TimeGrid default, EventInfo fallback)
	const getScrollable = () => {
		const tg = timeGridScrollRef.current;
		const ei = eventInfoScrollRef.current;
		if (!tg || !ei) return tg;
		return ei.scrollHeight > tg.scrollHeight ? ei : tg;
	}; 

	return (
		<div className={styles.scheduleContainer}>
			<CountdownBanner />
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

					<div className={styles.scheduleInfo} >
						<div className={styles.schedulePanels}>
							<div className={styles.timeGridScroll} ref={timeGridScrollRef}>
								<div ref={timeGridRef}>
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

							<div className={styles.eventInfoScroll} ref={eventInfoScrollRef}>
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
