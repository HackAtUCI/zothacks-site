"use client";

import Image from "next/image";

import warningIcon from "@/assets/icons/warning.svg";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./MentorDisclaimer.module.scss";

interface MentorDisclaimerProps {
	onContinue: () => void;
}

export default function MentorDisclaimer({
	onContinue,
}: MentorDisclaimerProps) {
	return (
		<div className={styles.disclaimerPage}>
			<div className={styles.backRow}>
				<PrimaryButton
					href="/apply"
					color="green"
					className={styles.backButton}
					variant="small"
				>
					Back
				</PrimaryButton>
			</div>

			<div className={styles.windowWrapper}>
				<RetroWindow title="Mentor Disclaimer" closeHref="/apply">
					<section className={styles.content}>
						<Image
							src={warningIcon}
							alt=""
							className={styles.warningIcon}
							height={100}
							width={112}
							aria-hidden
						/>

						<h1 className={styles.heading}>
							By submitting an application for ZotHacks 2026 as a Mentor, I
							understand the following:
						</h1>

						<ol className={styles.list}>
							<li>ZotHacks is an in person event.</li>
							<li>
								This is not an overnight event, and I am responsible for my own
								housing and transportation.
							</li>
							<li>Attendance on Friday and Saturday is mandatory.</li>
							<li>I will be at least 18 years old by October 16 2026.</li>
						</ol>

						<p className={styles.contact}>
							If you have any questions about ZotHacks or being a Mentor, please
							email{" "}
							<a href="mailto:zothacks2026@gmail.com">zothacks2026@gmail.com</a>
							.
						</p>

						<PrimaryButton
							type="button"
							className={styles.continueButton}
							onClick={onContinue}
							variant="small"
						>
							Continue
						</PrimaryButton>
					</section>
				</RetroWindow>
			</div>
		</div>
	);
}
