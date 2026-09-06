"use client";

import { useState } from "react";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./PortalDashboard.module.scss";

export default function DeclineAcceptanceBox() {
	const [showConfirmation, setShowConfirmation] = useState(false);

	return (
		<>
			<PrimaryButton
				type="button"
				color="red"
				className={styles.declineButton}
				onClick={() => setShowConfirmation(true)}
			>
				I am no longer able to attend ZotHacks 2026
			</PrimaryButton>

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
						aria-labelledby="decline-confirmation-title"
						onClick={(event) => event.stopPropagation()}
					>
						<RetroWindow
							title="Confirm Decline"
							framedContent
							onClose={() => setShowConfirmation(false)}
						>
							<div className={styles.portalModalContent}>
								<h2
									id="decline-confirmation-title"
									className={styles.portalModalTitle}
								>
									Are you sure?
								</h2>
								<p className={styles.portalModalCopy}>
									This will void your application and you will no longer be
									considered for ZotHacks 2026.
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
									<form method="post" action="/api/user/decline-acceptance">
										<PrimaryButton
											type="submit"
											color="red"
											variant="small"
											className={styles.portalModalButton}
										>
											Yes, decline
										</PrimaryButton>
									</form>
								</div>
							</div>
						</RetroWindow>
					</div>
				</div>
			)}
		</>
	);
}
