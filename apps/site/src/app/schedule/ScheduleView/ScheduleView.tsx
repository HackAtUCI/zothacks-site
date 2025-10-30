"use client";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import OptionSelector from "../OptionSelector/OptionSelector";
import OptionsDropdown from "../OptionsDropdown/OptionsDropdown";
import Image from "next/image";
import schedulePageBears from "@/assets/images/Schedule-bears.png";
import BackgroundMountains from "@/assets/background/BackgroundMountains.svg";
import ForegroundMountains from "@/assets/background/ForegroundMountains.svg";

import styles from "./ScheduleView.module.scss";

interface ScheduleProps {
	schedule: Array<any>;
}

const ScheduleView: React.FC<ScheduleProps> = ({ schedule }) => {
	const [selectedDay, setSelectedDay] = useState("Day One");

	const scheduleFlat = schedule.flat();
	const dayOne = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
			new Date(new Date("2025-11-08T00:00:00").toUTCString()).getTime(),
	);
	const dayTwo = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2025-11-09T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2025-11-08T00:00:00").toUTCString()).getTime(),
	);
	const dayThree = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2025-11-10T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2025-11-09T00:00:00").toUTCString()).getTime(),
	);

	return (
		<div className={styles.scheduleContainer}>
			<Header />
			<OptionSelector selectedDay={selectedDay} selectDay={setSelectedDay} />
			<OptionsDropdown
				selectedDay={selectedDay}
				dayOne={dayOne}
				dayTwo={dayTwo}
				dayThree={dayThree}
			/>
			<Image
				src={schedulePageBears}
				alt="Bears"
				className={styles.schedulePageBears}
			/>
		</div>
	);
};

export default ScheduleView;
