"use client";

import Image from "next/image";

import mascots from "@/assets/images/mentor-hacker-anteaters.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { Status } from "@/lib/userRecord";

import styles from "./Confirmation.module.scss";

type ConfirmationPageProps = {
	status: string;
};

export default function ConfirmationPage({ status }: ConfirmationPageProps) {
	const isAccepted = status === Status.Accepted;
	const isWaiverSigned = status === Status.Signed;

	return (
		<div className={styles.container}>
			<Image src={mascots} alt="Hacker Anteater" className={styles.mascot} />
			<div className={styles.messageBox}>
				<h1 className={styles.title}>
					{isAccepted ? (
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
					) : (
						<>
							Thank you for applying!
							<br />
							<br />
							We have received your application
							<br />
							and you should hear back from us soon!
						</>
					)}
				</h1>
			</div>

			{isAccepted && (
				<PrimaryButton href="/api/user/waiver">Sign Waiver</PrimaryButton>
			)}

			<PrimaryButton href="/">Return to Homepage</PrimaryButton>
		</div>
	);
}
