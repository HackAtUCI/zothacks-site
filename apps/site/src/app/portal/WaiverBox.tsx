import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./PortalDashboard.module.scss";

export default function WaiverBox() {
	return (
		<section className={styles.waiverWindow}>
			<RetroWindow title="Waiver Confirmation" framedContent>
				<div className={styles.waiverContent}>
					<h2 className={styles.boxHeading}>Waiver</h2>
					<p className={styles.boxCopy}>
						In order to attend ZotHacks 2026, all participants must complete the
						participation waiver and review the code of conduct. The button
						below will take you to a Docusign form to sign the waiver. After
						signing the waiver,{" "}
						<strong className={styles.returnToPortal}>
							please return to this portal
						</strong>{" "}
						to confirm your attendance.
					</p>
					<PrimaryButton
						href="/api/user/waiver"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.waiverButton}
					>
						Sign Waiver
					</PrimaryButton>
					<p className={styles.actionNote}>
						After signing the waiver, come back to this window to RSVP for
						ZotHacks.
					</p>
					<p className={styles.boxCopy}>
						If you have signed the waiver and received the confirmation, you do
						not have to sign the waiver again.
					</p>
				</div>
			</RetroWindow>
		</section>
	);
}
