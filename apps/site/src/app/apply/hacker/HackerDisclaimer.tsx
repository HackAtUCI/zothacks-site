"use client";

import Image from "next/image";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import warningIcon from "@/assets/icons/warning.svg";

import styles from "./HackerDisclaimer.module.scss";

interface HackerDisclaimerProps {
	onContinue: () => void;
}

export default function HackerDisclaimer({
	onContinue,
}: HackerDisclaimerProps) {
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
				<RetroWindow title="Hacker Disclaimer" closeHref="/apply">
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
							By submitting an application for ZotHacks 2026 as a Hacker, I
							understand the following:
						</h1>

						<ol className={styles.list}>
							<li>
								ZotHacks is an in person event from October 16 to October 18 and
								will require in person attendance on all 3 days.
							</li>
							<li>
								Transportation and overnight accommodations are not provided.
							</li>
							<li>
								I acknowledge that I must be a student enrolled at UC Irvine and
								18 years of age or older by the event to submit this
								application, and if I am found to be under 18 at the event, I
								may be removed from consideration for future Hack@UCI events at
								the organization&apos;s discretion.
							</li>
						</ol>

						<p className={styles.contact}>
							If you have any questions about ZotHacks or being a Hacker, please
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
