"use client";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import DayOne from "../DayOne/DayOne";
import DayTwo from "../DayTwo/DayTwo";
import DayThree from "../DayThree/DayThree";

import styles from "./ScheduleTimer.module.scss";

interface ScheduleProps {
	schedule: Array<any>;
}

const ScheduleTimer: React.FC<ScheduleProps> = ({ schedule }) => {
	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		function updatePerSecond() {
			setTime(Date.now());
		}
		let ret = setInterval(updatePerSecond, 1000);

		return () => clearInterval(ret);
	});

	const scheduleFlat = schedule.flat();
	const dayOne = scheduleFlat.filter(
		(s) => s.startTime.getTime() < new Date("2024-11-02T00:00:00"),
	);
	const dayTwo = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() < new Date("2024-11-03T00:00:00") &&
			s.startTime.getTime() > new Date("2024-11-02T00:00:00"),
	);
	const dayThree = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() < new Date("2024-11-04T00:00:00") &&
			s.startTime.getTime() > new Date("2024-11-03T00:00:00"),
	);

	return (
		<div className={styles.timer}>
			<Header time={time} />
			<DayOne schedule={dayOne} time={time} />
			<DayTwo schedule={dayTwo} time={time} />
			<DayThree schedule={dayThree} time={time} />
		</div>
	);
};

export default ScheduleTimer;
