"use client";

// React
import { useState } from "react";

// Next
import Image from "next/image";
import faqArrow from "@/assets/icons/faq-arrow.svg";

// Styles
import styles from "./OptionSelector.module.scss";

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

	return (
		<div className={styles.container}>
			<button
				className={styles.SelectTrigger}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.SelectTriggerContent}>
					<p className={styles.SelectTriggerText}>{selectedDay}</p>
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
						onClick={() => handleSelectDay("Day One")}
						type="button"
					>
						Day One
					</button>
					<button
						className={styles.SelectContentItem}
						onClick={() => handleSelectDay("Day Two")}
						type="button"
					>
						Day Two
					</button>
					<button
						className={styles.SelectContentItem}
						onClick={() => handleSelectDay("Day Three")}
						type="button"
					>
						Day Three
					</button>
				</div>
			)}
		</div>
	);
}
