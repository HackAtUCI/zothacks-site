"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import styles from "./Countdown.module.scss";

interface CountdownProps {
	countdownTo: Date;
	isHackingStarted: boolean;
}

const Countdown: React.FC<CountdownProps> = ({
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
				<span className={styles.number}>
					{Math.floor(remainingSeconds / (60 * 60))
						.toString()
						.padStart(2, "0")}
				</span>
				<span className={styles.colon}>:</span>
				<span className={styles.number}>
					{Math.floor((remainingSeconds / 60) % 60)
						.toString()
						.padStart(2, "0")}
				</span>

				<span className={styles.colon}>:</span>
				<span className={styles.number}>
					{Math.floor(remainingSeconds % 60)
						.toString()
						.padStart(2, "0")}
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

export default Countdown;
