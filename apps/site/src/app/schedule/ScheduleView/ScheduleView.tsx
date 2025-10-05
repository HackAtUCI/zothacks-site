"use client";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import OptionSelector from "../OptionSelector/optionSelector";
import OptionsDropdown from "../OptionsDropdown/optionsDropdown";
import Image from "next/image";
import scheduleImage from "@/assets/images/Schedule-bears.png";

import styles from "./ScheduleView.module.scss";

interface ScheduleProps {
	schedule: Array<any>;
}

const ScheduleView: React.FC<ScheduleProps> = ({ schedule }) => {
	const [selectedDay, setSelectedDay] = useState("dayOne");

	const scheduleFlat = schedule.flat();
	const dayOne = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
			new Date(new Date("2024-11-02T00:00:00").toUTCString()).getTime(),
	);
	const dayTwo = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2024-11-03T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2024-11-02T00:00:00").toUTCString()).getTime(),
	);
	const dayThree = scheduleFlat.filter(
		(s) =>
			s.startTime.getTime() <
				new Date(new Date("2024-11-04T00:00:00").toUTCString()).getTime() &&
			s.startTime.getTime() >
				new Date(new Date("2024-11-03T00:00:00").toUTCString()).getTime(),
	);

	return (
		<div className={styles.timer}>
			<Header />
			<OptionSelector selectedDay={selectedDay} selectDay={setSelectedDay} />
			<OptionsDropdown
				selectedDay={selectedDay}
				dayOne={dayOne}
				dayTwo={dayTwo}
				dayThree={dayThree}
			/>
			<Image
				src={scheduleImage}
				alt="schedule"
				className={styles.scheduleImage}
			/>
		</div>
	);
};

export default ScheduleView;
