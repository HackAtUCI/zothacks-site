"use client";
import { useState } from "react";
import Image from "next/image";
import hourglass from "@/assets/icons/hourglass.svg"
import styles from "./CountdownBanner.module.scss";

const CountdownBanner: React.FC = () => {

    // TO DO: Implement countdown logic and event label updates
    const [timeLeft, setTimeLeft] = useState("12:00:00");
	const [label, setLabel] = useState("Next Event");

	return (
		<>
			<div className={styles.countdownBanner}>
                <div className={styles.hourglassWrapper}>
                    <Image 
                        src={hourglass} 
                        alt="hourglass"
                        width={0}
                        height={0}
                        className={styles.hourglassIcon}
                    />
                </div>
                <div className={styles.countdownText}>
                    <div className={styles.timeRow}>
                        <p className={styles.timeLeft}>{timeLeft}</p>
                        <p>Remaining Until</p>
                    </div>
                    <p className={styles.nextEvent}>{label}</p>
                </div>
			</div>
		</>
	);
};

export default CountdownBanner;
