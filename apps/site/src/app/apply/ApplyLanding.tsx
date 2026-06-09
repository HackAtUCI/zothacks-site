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
							Are you applying as a Hacker or Mentor?
						</p>
						<div className={styles.buttons}>
							<PrimaryButton
								href="/apply/hacker"
								className={styles.applyButton}
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
