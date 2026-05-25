"use client";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import CountdownBanner from "../CountdownBanner/CountdownBanner"
import OptionTabs from "../OptionTabs/OptionTabs"
import OptionSelector from "../OptionSelector/OptionSelector";
import OptionsDropdown from "../OptionsDropdown/OptionsDropdown";
import Image from "next/image";

import styles from "./ScheduleView.module.scss";
import TimeGrid from "../TimeGrid/TimeGrid";
import EventInfo from "../EventInfo/EventInfo";

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

					<div className={styles.scheduleInfo}>
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
