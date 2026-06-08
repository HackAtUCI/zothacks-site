import Image from "next/image";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import infoIcon from "@/assets/images/info-icon.png";

import styles from "./ApplyLanding.module.scss";

export default function ApplyLanding() {
	return (
		<div className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title="Application">
					<div className={styles.content}>
						<Image src={infoIcon} alt="Info" className={styles.mascot} />
						<p className={styles.question}>
							Are you applying as a Hacker or Mentor?
						</p>
						<div className={styles.buttons}>
							<PrimaryButton href="/apply/hacker">Hacker</PrimaryButton>
							<PrimaryButton href="/apply/mentor">Mentor</PrimaryButton>
						</div>
					</div>
				</RetroWindow>
			</div>
		</div>
	);
}
