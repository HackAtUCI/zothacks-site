"use client";

import React from "react";
import Image from "next/image";

import EventCircle from "../Assets/Circle";
import useWindowWidth from "@/lib/useWindowWidth";

import Map3 from "@/assets/images/map3/map_3.svg";
import Path from "@/assets/images/map3/map_3_path.png";
import MobilePath from "@/assets/images/map3/map_3_path_mobile.png";

import styles from "./DayThree.module.scss";

interface DayThreeProps {
	schedule: Array<any>;
	time: number;
}

const DayThree: React.FC<DayThreeProps> = ({ schedule, time }) => {
	const windowWidth = useWindowWidth();
	const positions =
		windowWidth > 576
			? [
					{ top: "-5px", left: "-10px" },
					{ top: "calc(53% - 25px)", left: "50%" },
					{ top: "calc(100% - 25px)", left: "calc(100% - 50px)" },
				]
			: [
					{ top: "-200px", left: "22px" },
					{ top: "calc(14% - 25px)", left: "63%" },
					{ top: "calc(117% - 25px)", left: "calc(90% - 50px)" },
				];

	return (
		<>
			<div className={styles.mapContainer}>
				<Image src={Map3} alt="zothacks-map" className={styles.map3} />
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
							virtual={event?.virtual}
						/>
					))}
					<h3 className={styles.title}>Day Three</h3>
				</div>
			</div>
		</>
	);
};

export default DayThree;
