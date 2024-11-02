"use client";

import Image from "next/image";

import convertTime from "../convertTime";

import cross from "@/assets/images/map2/cross.svg";
import openNewWindow from "@/assets/icons/open_new_window_purple.svg";

import styles from "./Circle.module.scss";

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
			<h4 className="visually-hidden">{title}</h4>
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
			<div className={styles.textContainer} style={up ? { top: "-160px" } : {}}>
				<p className={styles.title}>{title}</p>
				<p className={styles.location}>{location}</p>
				<p className={styles.time}>{convertTime(startTime, endTime)}</p>
				{virtual && (
					<a
						href={`${virtual}`}
						className={styles.virtual}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div>Zoom</div>
						<Image src={openNewWindow} alt="open" />
					</a>
				)}
			</div>
		</div>
	);
};

export default EventCircle;
