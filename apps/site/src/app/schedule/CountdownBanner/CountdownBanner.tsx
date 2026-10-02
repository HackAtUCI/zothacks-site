"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import hourglass from "@/assets/icons/hourglass.svg";
import styles from "./CountdownBanner.module.scss";

interface CountdownEvent { 
	title: string;
	startTime: Date;
}

interface CountdownBannerProps {
	events: CountdownEvent[];
	onEventClick: (event: CountdownEvent) => void;
}

const pad = (num: number) => num.toString().padStart(2, "0");
const formatTime = (ms: number) => {
	const total = Math.max(0, Math.floor(ms / 1000));
	const d = Math.floor(total / 86400);
	const h = Math.floor((total % 86400) / 3600);
	const m = Math.floor((total % 3600) / 60);
	const s = total % 60;
	const clock = `${pad(h)}:${pad(m)}:${pad(s)}`;
	return d > 0 ? `${d}d ${clock}` : clock;
};

const CountdownBanner: React.FC<CountdownBannerProps> = ({ 
	events, 
	onEventClick,
 }) => {
	const [timeLeft, setTimeLeft] = useState("--:--:--");
	const [label, setLabel] = useState("Next Event");
	const [nextEvent, setNextEvent] = useState<CountdownEvent | null>(null);

	useEffect(() => {
		const tick = () => {
			const now = Date.now();
			const next = events
				.filter((e) => e.startTime.getTime() > now)
				.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())[0];
			if (!next) {
				setTimeLeft("00:00:00");
				setLabel("No Upcoming Events");
				setNextEvent(null);
				return;
			}
			setTimeLeft(formatTime(next.startTime.getTime() - now));
			setLabel(next.title);
			setNextEvent(next);
		};
		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	}, [events]);

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
					<p 
						className={styles.nextEvent}
						onClick={() => nextEvent && onEventClick?.(nextEvent)}
					>
						{label}
					</p>
				</div>
			</div>
		</>
	);
};

export default CountdownBanner;
