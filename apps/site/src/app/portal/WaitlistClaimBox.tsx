"use client";

import axios from "axios";
import useSWR from "swr";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import PortalTextBox from "./PortalTextBox";
import type { PortalState } from "./portalState";
import styles from "./PortalDashboard.module.scss";

type WaitlistStatus = {
	is_started: boolean;
	is_open: boolean;
	capacity: number | null;
	claimed_count: number;
	remaining_spots: number | null;
};

const fetcher = async (url: string) => {
	const res = await axios.get<WaitlistStatus>(url);
	return res.data;
};

type WaitlistClaimBoxProps = {
	portalState: PortalState;
};

export default function WaitlistClaimBox({
	portalState,
}: WaitlistClaimBoxProps) {
	const { data: waitlistStatus, isLoading } = useSWR<WaitlistStatus>(
		"/api/user/waitlist-open",
		fetcher,
	);
	if (isLoading || !waitlistStatus?.is_started) {
		return <PortalTextBox portalState={portalState} />;
	}

	const isClaimable = waitlistStatus.is_open;

	return (
		<section className={styles.waitlistClaimWindow}>
			<RetroWindow title="Waitlist Spot" framedContent>
				<div className={styles.waitlistClaimContent}>
					<h2 className={styles.boxHeading}>
						{isClaimable ? "Waitlist Spots Are Open" : "Waitlist Closed"}
					</h2>
					<p className={styles.boxCopy}>
						{isClaimable
							? "A limited number of spots are available. Continue to the waiver now. After signing, return to this portal to RSVP by 10/9 @ 11:59PM PT."
							: "All currently available waitlist spots have been claimed."}
					</p>
					{isClaimable && (
						<PrimaryButton
							href="/api/user/waiver"
							target="_blank"
							rel="noopener noreferrer"
							color="green"
							className={styles.waitlistClaimButton}
						>
							Continue to Waiver
						</PrimaryButton>
					)}
				</div>
			</RetroWindow>
		</section>
	);
}
