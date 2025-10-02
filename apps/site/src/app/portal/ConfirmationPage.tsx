import Image from "next/image";

import mascots from "@/assets/images/mentor-hacker-anteaters.svg";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./confirmation.module.scss";

export default function ConfirmationPage() {
	return (
		<div className={styles.container}>
			<div className={styles.messageBox}>
				<Image src={mascots} alt="Hacker Anteater" className={styles.mascot} />
				<h1 className={styles.title}>Thank you for applying!</h1>
			</div>

			<PrimaryButton href="/">Return to Homepage</PrimaryButton>
		</div>
	);
}
