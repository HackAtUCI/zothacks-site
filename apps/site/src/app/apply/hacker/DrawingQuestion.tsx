"use client";

import { useState } from "react";
import Image from "next/image";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import lockedIcon from "@/assets/icons/locked_drawing.png";
import proceedButtonImage from "@/assets/images/proceed-button.png";
import chainsImage from "@/assets/images/Chains.png";
import tutorialPeter from "@/assets/images/drawing-tutorial-peter.png";

import styles from "./DrawingQuestion.module.scss";

type DrawingStep = "locked" | "tutorial" | "confirm" | "drawing"; // going to be statuses of the drawing question - 4 steps
export default function DrawingQuestion() {
	const [step, setStep] = useState<DrawingStep>("locked");

	return (
		<>
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
						alt=""
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

			{step === "tutorial" && (
				<div
					className={styles.overlay}
					onClick={() => setStep("locked")}
				>
					<div
						className={styles.windowWrapper}
						onClick={(event) => event.stopPropagation()}
					>
						<RetroWindow title="Tutorial" onClose={() => setStep("locked")}>
							<div className={styles.tutorialContent}>
								<Image
									src={tutorialPeter}
									alt=""
									className={styles.tutorialMascot}
									aria-hidden
									height={167}
									width={206}
								/>

								<p className={styles.tutorialText}>
									You will be given{" "}
									<span className={styles.highlight}>1 minute</span> to draw
									your current emotional state on a blank Anteater face.
									Decorate however you&apos;d like!
								</p>
								<p className={styles.tutorialText}>
									You only have{" "}
									<span className={styles.highlight}>one chance</span>, so
									decorate wisely!
								</p>

								<PrimaryButton
									type="button"
									variant="small"
									className={styles.readyButton}
									onClick={() => setStep("confirm")}
								>
									I&apos;m ready!
								</PrimaryButton>
							</div>
						</RetroWindow>
					</div>
				</div>
			)}
		</>
	);
}
