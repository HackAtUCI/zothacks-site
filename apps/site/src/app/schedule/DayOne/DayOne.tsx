"use client";
import Image from "next/image";

import EventCircle from "../Assets/Circle";

import Map1 from "@/assets/images/map1/map_1.svg";
import MobileMap from "@/assets/images/map1/mobile_map.svg";
import MobilePath from "@/assets/images/map1/mobile_path.png";
import Path from "@/assets/images/map1/map_1_path.png";

import styles from "./DayOne.module.scss";

interface DayOneProps {
	schedule: Array<any>;
	time: number;
}

const DayOne: React.FC<DayOneProps> = ({ schedule, time }) => {
	const positions = [
		{ top: "-5px", left: "-10px" },
		{ top: "calc(36% - 25px)", left: "50%" },
		{ top: "calc(100% - 25px)", left: "calc(100% - 25px)" },
	];
	return (
		<>
			<div className={styles.mapContainer}>
				<h3 className="visually-hidden">Day 1</h3>
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
							virtual={event?.virtual}
						/>
					))}
					<p className={styles.title}>Day One</p>
				</div>
			</div>
		</>
	);
};

export default DayOne;
