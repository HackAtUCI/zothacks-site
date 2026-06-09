"use client";

import Image from "next/image";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { Status } from "@/lib/userRecord";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import HappyPeter from "@/assets/images/happy-peter.svg";

import styles from "./Confirmation.module.scss";

type ConfirmationPageProps = {
	status: string;
};

export default function ConfirmationPage({ status }: ConfirmationPageProps) {
	const isAccepted = status === Status.Accepted;
	const isWaiverSigned = status === Status.Signed;
	const isPendingReview = status === Status.Pending;

	const message = isAccepted ? (
		<>
			Congratulations!
			<br />
			<br />
			You have been accepted to ZotHacks.
			<br />
			Please sign your waiver to continue.
		</>
	) : isWaiverSigned ? (
		<>
			Thank you!
			<br />
			<br />
			Your waiver has been signed.
		</>
	) : isPendingReview ? (
		<>
			Thank you for applying! We will get back to
			<br />
			you by the end of Fall Quarter Week 2!
		</>
	) : (
		<>
			Thank you for applying!
			<br />
			<br />
			We have received your application
			<br />
			and you should hear back from us soon!
		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.window}>
				<RetroWindow title="Application" framedContent snapBack closeHref="/portal">
					<div className={styles.content}>
						<Image src={HappyPeter} alt="" className={styles.happyPeter} />
						<h1 className={styles.title}>{message}</h1>
						<div className={styles.actions}>
							{isAccepted ? (
								<PrimaryButton href="/api/user/waiver" className={styles.button}>
									Sign Waiver
								</PrimaryButton>
							) : (
								<PrimaryButton href="/portal" className={styles.button}>
									Continue to Portal
								</PrimaryButton>
							)}
						</div>
					</div>
				</RetroWindow>
			</div>
		</div>
	);
}
