"use client";

import { useState } from "react";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./PortalDashboard.module.scss";

type RsvpBoxProps = {
	applicationRole: "Hacker" | "Mentor";
};

export default function RsvpBox({ applicationRole }: RsvpBoxProps) {
	const roleLabel = applicationRole.toLowerCase();
	const [showConfirmation, setShowConfirmation] = useState(false);

	return (
		<section className={styles.rsvpWindow}>
			<RetroWindow title="RSVP" framedContent>
				<div className={styles.rsvpContent}>
					<div className={styles.rsvpBody}>
						<h2 className={styles.boxHeading}>RSVP</h2>
						<p className={styles.rsvpCopy}>
							Please RSVP here in order to secure a position as a {roleLabel}{" "}
							for ZotHacks 2026.
						</p>
						<PrimaryButton
							type="button"
							className={styles.rsvpButton}
							onClick={() => setShowConfirmation(true)}
						>
							RSVP
						</PrimaryButton>
					</div>
				</div>
			</RetroWindow>
			{showConfirmation && (
				<div
					className={styles.portalModalOverlay}
					role="presentation"
					onClick={() => setShowConfirmation(false)}
				>
					<div
						className={styles.portalModal}
						role="dialog"
						aria-modal="true"
						aria-labelledby="rsvp-confirmation-title"
						onClick={(event) => event.stopPropagation()}
					>
						<RetroWindow
							title="Confirm RSVP"
							framedContent
							onClose={() => setShowConfirmation(false)}
						>
							<div className={styles.portalModalContent}>
								<h2
									id="rsvp-confirmation-title"
									className={styles.portalModalTitle}
								>
									Confirm RSVP
								</h2>
								<p className={styles.portalModalCopy}>
									Please confirm that you are able to attend ZotHacks 2026.
								</p>
								<div className={styles.portalModalActions}>
									<PrimaryButton
										type="button"
										color="blue"
										variant="small"
										className={styles.portalModalButton}
										onClick={() => setShowConfirmation(false)}
									>
										Cancel
									</PrimaryButton>
									<form method="post" action="/api/user/rsvp">
										<PrimaryButton
											type="submit"
											color="green"
											variant="small"
											className={styles.portalModalButton}
										>
											Yes, RSVP
										</PrimaryButton>
									</form>
								</div>
							</div>
						</RetroWindow>
					</div>
				</div>
			)}
		</section>
	);
}
