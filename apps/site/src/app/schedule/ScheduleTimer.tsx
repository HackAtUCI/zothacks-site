"use client";

import DayOne from "./DayOne/DayOne";
import Header from "./Header/Header";
import DayTwo from "./DayTwo/DayTwo";
import DayThree from "./DayThree/DayThree";
import { useEffect, useState } from "react";

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
		(s) => s.startTime.getTime() < new Date("2024-11-2"),
	);
	const dayTwo = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() < new Date("2024-11-3") &&
			s.startTime.getTime() > new Date("2024-11-2"),
	);
	const dayThree = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() < new Date("2024-11-4") &&
			s.startTime.getTime() > new Date("2024-11-3"),
	);

	return (
		<>
			<Header time={time} />
			<DayOne schedule={dayOne} time={time} />
			<DayTwo schedule={dayTwo} time={time} />
			<DayThree schedule={dayThree} time={time} />
		</>
	);
};

export default ScheduleTimer;
