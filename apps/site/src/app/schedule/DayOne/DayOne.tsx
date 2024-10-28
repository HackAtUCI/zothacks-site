"use client";

import React, { useEffect, useState } from "react";
import Map1 from "@/assets/images/map1/map_1.svg";
import Path from "@/assets/images/map1/map_1_path.png";

import clsx from "clsx";
import styles from "./DayOne.module.scss";
import Image from "next/image";
import EventCircle from "../Assets/Circle";

interface DayOneProps {
	schedule: Array<any>;
}

const DayOne: React.FC<DayOneProps> = ({ schedule }) => {
	const positions = [
		{ top: "-5px", left: "-10px" },
		{ top: "calc(36% - 25px)", left: "50%" },
		{ top: "calc(100% - 25px)", left: "calc(100% - 25px)" },
	];
	return (
		<>
			<div className={styles.mapContainer}>
				<Image src={Map1} alt="zothacks-map" className={styles.map1} />
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
                            up={i == schedule.length - 1 ? true: false}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default DayOne;
