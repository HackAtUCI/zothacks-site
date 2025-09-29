import styles from "./confirmation.module.scss";
import Image from "next/image";
import mascots from "@/assets/images/mentor-hacker-anteaters.svg";


export default function ConfirmationPage() {
	return (
		<div className={styles.container}>
			<div className={styles.messageBox}>
				<Image src={mascots} alt="Hacker Anteater" className={styles.mascot} />
				<h1 className={styles.title}>Thank you for applying!</h1>
			</div>

			<button className={styles.button}>Return to Homepage</button>
		</div>
	);
}
