"use client";
import Image from "next/image";

import Countdown from "../Countdown/Countdown";

import Chest from "@/assets/images/schedule-chest.svg";
import OpenChest from "@/assets/images/schedule-chest-open.svg";
import Title from "@/assets/images/schedule-title.svg";
import styles from "./Header.module.scss";

interface HeaderProps {
	time: number;
}

const Header: React.FC<HeaderProps> = ({ time }) => {
	const hackingStarts = new Date("2024-11-02T10:00:00");
	const hackingEnds = new Date("2024-11-02T22:00:00");
	return (
		<>
			<div className={styles.header}>
				<h1 className="visually-hidden">Schedule</h1>
				<Image src={Title} alt="" />
				{time < hackingEnds.getTime() && <Image src={Chest} alt="Chest" />}
				{time >= hackingEnds.getTime() && <Image src={OpenChest} alt="Chest" />}
				<Countdown
					countdownTo={
						time >= hackingStarts.getTime() ? hackingEnds : hackingStarts
					}
					isHackingStarted={time >= hackingStarts.getTime()}
				/>
				<h2 className="visually-hidden">Events</h2>
			</div>
		</>
	);
};

export default Header;
