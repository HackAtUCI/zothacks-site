"use client";
import Image from "next/image";
import Chest from "@/assets/images/schedule-chest.png";
import OpenChest from "@/assets/images/schedule-chest-open.svg";
import Title from "@/assets/images/schedule-title.png";
import Countdown from "../Countdown/Countdown";
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
				<Image src={Title} alt="title" />
				{time < hackingEnds.getTime() && <Image src={Chest} alt="Chest" />}
				{time >= hackingEnds.getTime() && <Image src={OpenChest} alt="Chest" />}
				<Countdown
					countdownTo={
						time >= hackingStarts.getTime() ? hackingEnds : hackingStarts
					}
					isHackingStarted={time >= hackingStarts.getTime()}
				/>
			</div>
		</>
	);
};

export default Header;
