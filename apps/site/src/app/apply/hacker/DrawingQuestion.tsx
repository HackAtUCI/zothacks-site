"use client";

import { useState } from "react";
import Image from "next/image";

import lockedIcon from "@/assets/icons/locked_drawing.png";
import proceedButtonImage from "@/assets/images/proceed-button.png";
import chainsImage from "@/assets/images/Chains.png";	

import styles from "./DrawingQuestion.module.scss";

type DrawingStep = "locked" | "tutorial" | "confirm" | "drawing"; // going to be statuses of the drawing question - 4 steps

export default function DrawingQuestion() {
	const [step, setStep] = useState<DrawingStep>("locked");

	if (step === "locked") {
		return (
			<div className={styles.lockedPanel}>
				<div className={styles.lockedHeading}>
					<Image
						src={lockedIcon}
						alt=""
						className={styles.warningIcon}
						height={37}
						width={40}
						aria-hidden
					/>
					<span>Locked - Action Required</span>
				</div>

				<div className={styles.chainGraphic}>
					<Image
						src={chainsImage}
						alt="Four chains to show locked status"
						fill
						className={styles.chainsImage}
						aria-hidden
					/>
					<button
						type="button"
						className={styles.proceedButton}
						onClick={() => setStep("tutorial")}
					>
						<Image
							src={proceedButtonImage}
							alt="Button to click to proceed to the locked drawing question"
							className={styles.proceedImage}
							height={113}
							width={269}
						/>
					</button>
				</div>
			</div>
		);
	}

	// TODO: tutorial / confirm / drawing steps are built in a follow-up commit
	return null;
}
