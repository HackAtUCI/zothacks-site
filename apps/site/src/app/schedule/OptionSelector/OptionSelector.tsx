"use client";

import { useState } from "react";

import Image from "next/image";
import styles from "./OptionSelector.module.scss";
import faqArrow from "@/assets/icons/faq-arrow.svg";

interface OptionSelectorProps {
	selectedDay: string;
	selectDay: (day: string) => void;
}

export default function OptionSelector({
	selectDay,
	selectedDay,
}: OptionSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectDay = (day: string) => {
		selectDay(day);
		setIsOpen(false);
	};

	const formattedSelectedDay = (selectedDay: string) => {
		switch (selectedDay) {
			case "dayOne":
				return "Day One";
			case "dayTwo":
				return "Day Two";
			case "dayThree":
				return "Day Three";
		}
	};

	return (
		<div className={styles.container}>
			<button
				className={styles.SelectTrigger}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.SelectTriggerContent}>
					<p className={styles.SelectTriggerText}>
						{formattedSelectedDay(selectedDay)}
					</p>
					{isOpen ? (
						<Image
							src={faqArrow}
							alt="arrow down"
							className={styles.SelectTriggerIconDown}
						/>
					) : (
						<Image
							src={faqArrow}
							alt="arrow up"
							className={styles.SelectTriggerIconOpen}
						/>
					)}
				</div>
			</button>

			{isOpen && (
				<div className={styles.SelectContent}>
					<button
						className={styles.SelectContentItem}
						onClick={() => handleSelectDay("dayOne")}
						type="button"
					>
						Day One
					</button>
					<button
						className={styles.SelectContentItem}
						onClick={() => handleSelectDay("dayTwo")}
						type="button"
					>
						Day Two
					</button>
					<button
						className={styles.SelectContentItem}
						onClick={() => handleSelectDay("dayThree")}
						type="button"
					>
						Day Three
					</button>
				</div>
			)}
		</div>
	);
}
