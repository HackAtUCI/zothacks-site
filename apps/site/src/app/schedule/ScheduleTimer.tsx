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

	return (
		<>
			<Header time={time}/>
			<DayOne schedule={schedule[0]} time={time}/>
			<DayTwo schedule={schedule[1]} time={time}/>
			<DayThree schedule={schedule[2]} time={time}/>
		</>
	);
};

export default ScheduleTimer;
