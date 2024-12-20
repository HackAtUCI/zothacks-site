"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import useWindow from "./useWindow";
import CountdownClock from "./CountdownClock";

import bg_map from "@/assets/images/maps/countdown.svg";
import boat from "@/assets/icons/boat.svg";

import styles from "./Countdown.module.scss";

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
	const hackStartTime = new Date("2024-11-02T10:00:00"); // TBD, zothacks start time
	const hackEndTime = new Date("2024-11-02T22:00:00"); // TBD, zothacks end time

	const [curTime, setCurTime] = useState(new Date());

	useEffect(() => {
		const i = setInterval(() => {
			setCurTime(new Date());
		}, 1000);

		return () => clearInterval(i);
	}, []);

	const ended = schedule.filter((el) => el.endTime >= curTime);

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

	const percentageCrossed =
		before.endTime.getTime() > 0
			? curTime.getTime() < before.startTime.getTime()
				? 0
				: 100 -
					((before.endTime.getTime() - curTime.getTime()) /
						(before.endTime.getTime() - before.startTime.getTime())) *
						100
			: 100;

	const [w] = useWindow();

	const totalLines = Math.floor(w / 66) > 7 ? Math.floor(w / 66) : 7;

	const totals = Array(totalLines + 1).fill(0);

	function returnPosition(num: number) {
		// this is the parabola -(0.2x - 1.5)^2 + 2.25
		let step = (20 / totalLines) * num;
		let prop_y = (-((0.15 * step - 1.5) * (0.15 * step - 1.5)) + 2.25) / 2.25;
		return [`${step * 5}%`, `${prop_y * 100}%`];
	}

	function returnRotation(num: number) {
		// this is the derivative of the aforementioned parabola turned into degrees of rotation
		let step = (15 / totalLines) * num;
		return Math.atan(-(2 * step - 15) / 25);
	}

	if (curTime > hackEndTime) {
		return (
			<div className={styles.countdownWrapper}>
				<Image src={bg_map} alt="background map for countdown" />
				<div className={styles.countdownMaterial}>
					<h1 className={styles.endText}>Hacking has ended!</h1>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.countdownWrapper}>
			<Image src={bg_map} alt="background map for countdown" width={2300} />
			{w > 0 && (
				<div className={styles.countdownMaterial}>
					{curTime >= hackStartTime ? (
						<div className={styles.progressContainer}>
							<div style={{ height: `100px` }} className={styles.paraboloid}>
								{totals.map((_, i) => (
									<div
										key={`line-segment-${i}`}
										style={{
											left: returnPosition(i)[0],
											bottom: returnPosition(i)[1],
											position: "absolute",
											backgroundColor: `${i / totals.length > percentageCrossed / 100 ? "#DB9F42" : "#78cae3"}`,
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
										left: "-20px",
									}}
								>
									<div className={styles.countdownTextTop}>
										{before.location && w <= 800 ? (
											<p>{before.location}</p>
										) : null}
										{before.startTime.getTime() && w <= 800 ? (
											<p>{`${before.startTime.getHours() % 12 == 0 ? 12 : before.startTime.getHours() % 12}${before.startTime.getHours() == 11 ? " am" : ""}-${before.endTime.getHours() % 12 == 0 ? 12 : before.endTime.getHours() % 12} ${before.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
										) : null}
									</div>
									<div className={styles.innerCircle}></div>
									<div className={styles.countdownText}>
										<h5>{before.title}</h5>
										{before.location && w > 800 ? (
											<p>{before.location}</p>
										) : null}
										{before.startTime.getTime() && w > 800 ? (
											<p>{`${before.startTime.getHours() % 12 == 0 ? 12 : before.startTime.getHours() % 12}${before.startTime.getHours() == 11 ? " am" : ""}-${before.endTime.getHours() % 12 == 0 ? 12 : before.endTime.getHours() % 12} ${before.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
										) : null}
									</div>
								</div>

								<div
									className={styles.outerCircle}
									style={{
										right: "-38px",
									}}
								>
									<div className={styles.countdownTextTop}>
										{after.location && w <= 800 ? (
											<p>{after.location}</p>
										) : null}
										{after.startTime.getTime() && w <= 800 ? (
											<p>{`${after.startTime.getHours() % 12 == 0 ? 12 : after.startTime.getHours() % 12}${after.startTime.getHours() == 11 ? " am" : ""}-${after.endTime.getHours() % 12 == 0 ? 12 : after.endTime.getHours() % 12} ${after.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
										) : null}
									</div>
									<div className={styles.innerCircle}></div>
									<div className={styles.countdownText}>
										<h5>{after.title}</h5>
										{after.location && w > 800 ? <p>{after.location}</p> : null}
										{after.startTime.getTime() && w > 800 ? (
											<p>{`${after.startTime.getHours() % 12 == 0 ? 12 : after.startTime.getHours() % 12}${after.startTime.getHours() == 11 ? " am" : ""}-${after.endTime.getHours() % 12 == 0 ? 12 : after.endTime.getHours() % 12} ${after.endTime.getHours() < 12 ? "am" : "pm"}`}</p>
										) : null}
									</div>
								</div>
								<div
									className={styles.boat}
									style={{
										left: returnPosition(
											(percentageCrossed * totals.length) / 100,
										)[0],
										bottom: returnPosition(
											(percentageCrossed * totals.length) / 100,
										)[1],
									}}
								>
									<Image
										src={boat}
										alt="boat"
										style={{
											transform: `rotate(${percentageCrossed < 30 ? -((returnRotation((Math.max(percentageCrossed, 1.6 * percentageCrossed ** 0.7 + 4) * totals.length) / 100) * 180) / Math.PI) : -((returnRotation((percentageCrossed * totals.length) / 100) * 180) / Math.PI)}deg)`,
										}}
									/>
								</div>
							</div>
							<div className={styles.clockPos}>
								<CountdownClock
									countdownTo={
										curTime > hackStartTime ? hackEndTime : hackStartTime
									}
									isHackingStarted={curTime >= hackStartTime}
								/>
							</div>
						</div>
					) : (
						<div className={styles.preCountdown}>
							<CountdownClock
								countdownTo={
									curTime > hackStartTime ? hackEndTime : hackStartTime
								}
								isHackingStarted={curTime >= hackStartTime}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Countdown;
