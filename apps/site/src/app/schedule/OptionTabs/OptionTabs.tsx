"use client";

// Styles
import styles from "./OptionTabs.module.scss";

interface OptionTabsProps {
	selectedDay: string;
	selectDay: (day: string) => void;
}

const DAYS = ["Fri", "Sat", "Sun"];

export default function OptionTabs({
	selectDay,
	selectedDay,
}: OptionTabsProps) {
	return (
		<div className={styles.container}>
			{DAYS.map((day) => (
				<button
					key={day}
					className={`${styles.tab} ${selectedDay === day ? styles.activeTab : ""}`}
					onClick={() => selectDay(day)}
					type="button"
				>
					{day}
				</button>
			))}
		</div>
	);
}
