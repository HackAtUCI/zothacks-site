"use client";

import styles from "./Circle.module.scss";
import Image from "next/image";
import cross from "@/assets/images/map2/cross.svg";
import convertTime from "../convertTime";
import openNewWindow from "@/assets/icons/open_new_window_purple.svg";

interface CircleProps {
	title: String;
	location: String;
	startTime: Date;
	endTime: Date;
	position: object;
	up: boolean;
	time: number;
	virtual: String;
}

const EventCircle: React.FC<CircleProps> = ({
	title,
	location,
	startTime,
	endTime,
	position,
	up,
	time,
	virtual,
}) => {
	let curTime = new Date(time);
	return (
		<div
			className={styles.outerCircle}
			style={
				title == "Hacking Ends"
					? {
							...position,
							backgroundColor: "transparent",
							borderColor: "transparent",
						}
					: position
			}
		>
			{title == "Hacking Ends" ? (
				<Image src={cross} alt="x" />
			) : (
				<div
					className={styles.innerCircle}
					style={
						curTime >= startTime
							? curTime > endTime
								? { backgroundColor: "#01a7c5" }
								: { backgroundColor: "#ffd600" }
							: { backgroundColor: "#bd5a5a" }
					}
				></div>
			)}
			<div className={styles.textContainer} style={up ? { top: "-145px" } : {}}>
				<h5 className={styles.title}>{title}</h5>
				<p className={styles.location}>{location}</p>
				<p className={styles.time}>{convertTime(startTime, endTime)}</p>
				{virtual && (
					<a
						href={`${virtual}`}
						className={styles.virtual}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p>Zoom</p>
						<Image src={openNewWindow} alt="open" />
					</a>
				)}
			</div>
		</div>
	);
};

export default EventCircle;
