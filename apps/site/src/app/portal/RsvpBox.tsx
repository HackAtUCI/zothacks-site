import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./PortalDashboard.module.scss";

type RsvpBoxProps = {
	applicationRole: "Hacker" | "Mentor";
};

export default function RsvpBox({ applicationRole }: RsvpBoxProps) {
	const roleLabel = applicationRole.toLowerCase();

	return (
		<section className={styles.rsvpWindow}>
			<RetroWindow title="RSVP" framedContent>
				<div className={styles.rsvpContent}>
					<div className={styles.rsvpBody}>
						<h2 className={styles.boxHeading}>RSVP</h2>
						<p className={styles.rsvpCopy}>
							Please RSVP here in order to secure a position as a {roleLabel} for
							ZotHacks 2026.
						</p>
						<PrimaryButton type="button" className={styles.rsvpButton}>
							RSVP
						</PrimaryButton>
					</div>
				</div>
			</RetroWindow>
		</section>
	);
}
