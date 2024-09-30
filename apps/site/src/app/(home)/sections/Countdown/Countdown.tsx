"use client";

import bg_map from "@/assets/images/maps/countdown.svg";
import Image from "next/image";
import { useRef } from "react";
import useWindow from "./useWindow";

import styles from "./Countdown.module.scss";
import CountdownClock from "./CountdownClock";

interface CountdownProps {
	schedule: {
		title: string;
		location?: string | undefined;
		virtual?: string | undefined;
		startTime: Date;
		endTime: Date;
		organization?: string | undefined;
		hosts?: string[] | undefined;
		description: any;
	}[];
}

const Countdown: React.FC<CountdownProps> = ({ schedule }) => {
	const curTime = new Date("2023-11-04T02:00:00.000Z");
	const endTime = new Date("2024-11-04T02:00:00.000Z");
	console.log(schedule);
	const ended = schedule.filter((el) => el.endTime > curTime);

	console.log(ended);

	const before =
		ended.length > 0
			? ended[0]
			: {
					title: "That's a wrap~",
					location: "",
					startTime: new Date(0),
					endTime: new Date(0),
				};

	const after =
		ended.length > 1
			? ended[1]
			: {
					title: "That's a wrap~",
					location: "",
					startTime: new Date(0),
					endTime: new Date(0),
				};

	const [w, h] = useWindow();

	const totalLines = Math.floor(w / 66);

	const totals = Array(totalLines + 1).fill(0);

	function returnPosition(num: number) {
		// this is the parabola -(0.2x - 1.5)^2 + 2.25
		let step = (20 / totalLines) * num;
		console.log("step", step);
		let prop_y = (-((0.15 * step - 1.5) * (0.15 * step - 1.5)) + 2.25) / 2.25;
		return [`${step * 5}%`, `${prop_y * 100}%`];
	}

	function returnRotation(num: number) {
		// this is the derivative of the aforementioned parabola turned into degrees of rotation
		let step = (15 / totalLines) * num;
		return Math.atan(-(2 * step - 15) / 25);
	}

	return (
		<div className={styles.countdownWrapper}>
			<Image src={bg_map} alt="bg_map" />
			<div className={styles.countdownMaterial}>
				<div className={styles.progressContainer}>
					<div
						style={{ width: `${Math.floor(w / 1.7)}px`, height: `100px` }}
						className={styles.paraboloid}
					>
						{totals.map((el, i) => (
							<div
								key={i}
								style={{
									left: returnPosition(i)[0],
									bottom: returnPosition(i)[1],
									position: "absolute",
									backgroundColor: "#DB9F42",
									width: "18px",
									height: "5px",
									borderRadius: "6px",
									transform: `rotate(${-((returnRotation(i) * 180) / Math.PI)}deg)`,
								}}
							></div>
						))}
						<div
							className={styles.outerCircle}
							style={{
								bottom: "-20px",
								left: "-20px",
							}}
						>
							<div className={styles.innerCircle}></div>
						</div>
						<div>
							<h5>{before.title}</h5>
							{before?.location && <p>{before.location}</p>}
							{before?.startTime.getTime() ? (
								<p>{`${before.startTime.getHours() % 12} ${before.startTime.getHours() == 11 ? "am" : ""}-${before.endTime.getHours() % 12} ${before.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
							) : null}
						</div>
						<div
							className={styles.outerCircle}
							style={{
								bottom: "-20px",
								right: "-38px",
							}}
						>
							<div className={styles.innerCircle}></div>
						</div>
						<div>
							<h5>{after.title}</h5>
							{after.location && <p>{after.location}</p>}
							{after.startTime.getTime() ? (
								<p>{`${after.startTime.getHours() % 12}${after.startTime.getHours() == 11 ? " am" : ""}-${after.endTime.getHours() % 12} ${after.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
							) : null}
						</div>
					</div>
				</div>
				<CountdownClock countdownTo={endTime} isHackingStarted={false} />
			</div>
		</div>
	);
};

export default Countdown;
