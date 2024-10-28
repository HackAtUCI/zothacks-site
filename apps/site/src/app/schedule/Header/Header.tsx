"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Chest from "@/assets/images/schedule-chest.png";
import Title from "@/assets/images/schedule-title.png";
import Countdown from "../ClipboardSchedule/Countdown";
import styles from "./Header.module.scss"

const Header = () => {
	let hackingStarts = new Date(1730566800);
	return (
		<>
			<div className={styles.header}>
				<Image src={Title} alt="title" />
				<Image src={Chest} alt="Chest" />
				<Countdown
					countdownTo={hackingStarts}
					isHackingStarted={new Date() > hackingStarts}
				/>
			</div>
		</>
	);
};

export default Header;
