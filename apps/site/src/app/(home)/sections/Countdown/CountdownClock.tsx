"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import styles from "./CountdownClock.module.scss";

interface CountdownProps {
	countdownTo: Date;
	isHackingStarted: boolean;
}

const CountdownClock: React.FC<CountdownProps> = ({
	countdownTo,
	isHackingStarted,
}) => {
	const [remainingSeconds, setRemainingSeconds] = useState<number>(NaN);

	useEffect(() => {
		setRemainingSeconds(
			Math.max(0, (countdownTo.valueOf() - new Date().valueOf()) / 1000),
		);
		const interval = setInterval(() => {
			setRemainingSeconds((r) => Math.max(0, r - 1));
		}, 1000);

		return () => clearInterval(interval);
	}, [countdownTo]);

	return (
		<div
			className={clsx(
				styles.countdown,
				!isNaN(remainingSeconds) && styles.loaded,
			)}
		>
			<span className={styles.time}>
				<span className={styles.timePortion}>
					<span className={styles.timeBlock}>
						{Math.floor(remainingSeconds / (60 * 60 * 24))
							.toString()
							.split("")
							.map((el) => {
								return <span className={styles.number}>{el}</span>;
							})}
					</span>

					<span className={styles.timeText}>Days</span>
				</span>
				<span className={styles.timePortion}>
					<span className={styles.timeBlock}>
						<span className={styles.number}>
							{`${Math.floor((remainingSeconds / 3600) % 24) < 10 ? "0" : ""}`}
						</span>
						<span className={styles.number}>
							{`${Math.floor((remainingSeconds / 3600) % 24).toString()}`}
						</span>
					</span>
					<span className={styles.timeText}>Hours</span>
				</span>
				<span className={styles.timePortion}>
					<span className={styles.timeBlock}>
						<span className={styles.number}>
							{`${Math.floor((remainingSeconds / 60) % 60) < 10 ? "0" : Math.floor(((remainingSeconds / 60) % 60) / 10)}`}
						</span>
						<span className={styles.number}>
							{`${Math.floor((remainingSeconds / 60) % 60) % 10}`}
						</span>
					</span>
					<span className={styles.timeText}>Minutes</span>
				</span>
				<span className={styles.timePortion}>
					<span className={styles.timeBlock}>
						<span className={styles.number}>
							{`${Math.floor(remainingSeconds % 60) < 10 ? "0" : Math.floor((remainingSeconds % 60) / 10)}`}
						</span>
						<span className={styles.number}>
							{`${Math.floor(remainingSeconds % 60) % 10}`}
						</span>
					</span>
					<span className={styles.timeText}>Seconds</span>
				</span>
			</span>
			<span className={styles.caption}>
				{isHackingStarted && !isNaN(remainingSeconds)
					? "Until Hacking Ends"
					: "Until Hacking Begins"}
			</span>
		</div>
	);
};

export default CountdownClock;
