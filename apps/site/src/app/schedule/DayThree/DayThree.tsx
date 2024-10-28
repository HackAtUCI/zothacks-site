"use client";

import React, { useEffect, useState } from "react";
import Map3 from "@/assets/images/map3/map_3.svg";
import Path from "@/assets/images/map3/map_3_path.png";

import clsx from "clsx";
import styles from "./DayThree.module.scss";
import Image from "next/image";
import EventCircle from "../Assets/Circle";

interface DayThreeProps {
	schedule: Array<any>;
	time: number;
}

const DayThree: React.FC<DayThreeProps> = ({ schedule, time }) => {
	const positions = [
		{ top: "-5px", left: "-10px" },
		{ top: "calc(53% - 25px)", left: "50%" },
		{ top: "calc(100% - 25px)", left: "calc(100% - 25px)" },
	];
	return (
		<>
			<div className={styles.mapContainer}>
				<Image src={Map3} alt="zothacks-map" className={styles.map3} />
				<div className={styles.mapPath}>
					<Image src={Path} alt="zothacks-path" className={styles.pathImage} />
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
					<h4 className={styles.title}>Day Three</h4>
				</div>
			</div>
		</>
	);
};

export default DayThree;
