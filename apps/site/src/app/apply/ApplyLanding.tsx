import Image from "next/image";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import ApplyPeter from "@/assets/images/apply-peter.svg";

import styles from "./ApplyLanding.module.scss";

export default function ApplyLanding() {
	return (
		<div className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title="Application" closeHref="/apply">
					<div className={styles.content}>
						<Image
							src={ApplyPeter}
							alt="Apply Peter"
							className={styles.mascot}
						/>
						<p className={styles.question}>
							Are you applying as a Hacker or a Mentor?
						</p>
						<div className={styles.buttons}>
							<PrimaryButton
								type="button"
								disabled
								className={`${styles.applyButton} ${styles.disabledButton}`}
							>
								Hacker
							</PrimaryButton>
							<PrimaryButton
								href="/apply/mentor"
								className={styles.applyButton}
							>
								Mentor
							</PrimaryButton>
						</div>
					</div>
				</RetroWindow>
			</div>
		</div>
	);
}
