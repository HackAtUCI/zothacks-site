"use client";

import React, { useEffect, useState } from "react";
import Map1 from "@/assets/images/map1/map_1.svg";
import MobileMap from "@/assets/images/map1/mobile_map.svg";
import MobilePath from "@/assets/images/map1/mobile_path.png";
import Path from "@/assets/images/map1/map_1_path.png";

import clsx from "clsx";
import styles from "./DayOne.module.scss";
import Image from "next/image";
import EventCircle from "../Assets/Circle";
import { useWindowSize } from "react-use";
import useWindowWidth from "@/lib/useWindowWidth";

interface DayOneProps {
	schedule: Array<any>;
	time: number;
}

const DayOne: React.FC<DayOneProps> = ({ schedule, time }) => {
	// const size = useWindowWidth();
	const positions = [
		{ top: "-5px", left: "-10px" },
		{ top: "calc(36% - 25px)", left: "50%" },
		{ top: "calc(100% - 25px)", left: "calc(100% - 25px)" },
	];
	return (
		<>
			<div className={styles.mapContainer}>
				<Image src={Map1} alt="zothacks-map" className={styles.map1} />
				<Image
					src={MobileMap}
					alt="zothacks-map"
					className={styles.mobileMap}
				/>
				<div className={styles.mapPath}>
					<Image src={Path} alt="zothacks-path" className={styles.pathImage} />
					<Image
						src={MobilePath}
						alt="zothacks-path"
						className={styles.mobilePath}
					/>

					{schedule.map((event, i) => (
						<EventCircle
							key={event._id}
							title={event.title}
							location={event.location}
							startTime={event.startTime}
							endTime={event.endTime}
							position={positions[i]}
							up={i == schedule.length - 1 ? true : false}
							time={time}
						/>
					))}
					<h4 className={styles.title}>Day One</h4>
				</div>
			</div>
		</>
	);
};

export default DayOne;
