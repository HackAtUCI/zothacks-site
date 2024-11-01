"use client";

import React, { useEffect, useState } from "react";
import Map2 from "@/assets/images/map2/map_2.svg";
import Path from "@/assets/images/map2/map_2_path.png";
import MobilePath from "@/assets/images/map2/map_2_path_mobile.png";

import styles from "./DayTwo.module.scss";
import Image from "next/image";
import EventCircle from "../Assets/Circle";
import useWindowWidth from "@/lib/useWindowWidth";

interface DayTwoProps {
	schedule: Array<any>;
	time: number;
}

const DayTwo: React.FC<DayTwoProps> = ({ schedule, time }) => {
	const windowWidth = useWindowWidth();
	const positions =
		windowWidth > 768
			? [
					{ top: "-0.5%", left: "16%" },
					{ top: "1.5%", left: "60%" },
					{ top: "13.5%", left: "65%" },
					{ top: "24%", left: "55%" },
					{ top: "28.5%", left: "32%" },
					{ top: "43%", left: "23%" },
					{ top: "44.8%", left: "60%" },
					{ top: "59.5%", left: "38%" },
					{ top: "70%", left: "30%" },
					{ top: "80.5%", left: "70%" },
					{ top: "82.5%", left: "20%" },
					{ top: "95%", left: "50%" },
					{ top: "99%", left: "92%" },
				]
			: [
					{ top: "-0.5%", left: "16%" },
					{ top: "-0.4%", left: "70%" },
					{ top: "13.5%", left: "65%" },
					{ top: "20%", left: "18%" },
					{ top: "28%", left: "32%" },
					{ top: "43%", left: "23%" },
					{ top: "50%", left: "74%" },
					{ top: "59%", left: "38%" },
					{ top: "71%", left: "30%" },
					{ top: "80.5%", left: "70%" },
					{ top: "82.5%", left: "20%" },
					{ top: "94%", left: "10%" },
					{ top: "98.5%", left: windowWidth < 576 ? "82%" : "90%" },
				];
	return (
		<>
			<div className={styles.mapContainer}>
				<Image src={Map2} alt="zothacks-map" className={styles.map2} />
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
					<h4 className={styles.title}>Day Two</h4>
				</div>
			</div>
		</>
	);
};

export default DayTwo;
