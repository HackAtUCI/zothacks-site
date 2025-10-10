import Image from "next/image";

import mascots from "@/assets/images/mentor-hacker-anteaters.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./Confirmation.module.scss";

export default function ConfirmationPage() {
	return (
		<div className={styles.container}>
			<Image src={mascots} alt="Hacker Anteater" className={styles.mascot} />
			<div className={styles.messageBox}>
				<h1 className={styles.title}>
					Thank you for applying!
					<br />
					<br />
					We have received your application
					<br />
					and you should hear back from us soon!
				</h1>
			</div>

			<PrimaryButton href="/">Return to Homepage</PrimaryButton>
		</div>
	);
}
