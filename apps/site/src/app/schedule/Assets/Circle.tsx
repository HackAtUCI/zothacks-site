"use client";

import React, { useEffect, useState } from "react";
import Map1 from "@/assets/images/map1/map_1.png";

import clsx from "clsx";
import styles from "./Circle.module.scss";
import Image from "next/image";
import cross from "@/assets/images/map2/cross.svg";

interface CircleProps {
	title: String;
	location: String;
	startTime: Date;
	endTime: Date;
	position: object;
	up: boolean;
	time: number;
}

const EventCircle: React.FC<CircleProps> = ({
	title,
	location,
	startTime,
	endTime,
	position,
	up,
	time
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
			<div className={styles.textContainer} style={up ? { top: "-155px" } : {}}>
				<h5>{title}</h5>
				<p>{location}</p>
				{startTime.getHours() == endTime.getHours() ? (
					<p>{`${endTime.getHours() % 12 == 0 ? 12 : startTime.getHours() % 12} ${endTime.getHours() < 12 ? "am" : "pm"}`}</p>
				) : (
					<p>{`${startTime.getHours() % 12 == 0 ? 12 : startTime.getHours() % 12}${startTime.getHours() == 11 ? " am" : ""}-${endTime.getHours() % 12 == 0 ? 12 : endTime.getHours() % 12} ${endTime.getHours() < 12 ? "am" : "pm"}`}</p>
				)}
			</div>
		</div>
	);
};

export default EventCircle;
