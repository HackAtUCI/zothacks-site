import Image from "next/image";

import mascots from "@/assets/images/mentor-hacker-anteaters.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./ApplicationsClosed.module.scss";

export default function ApplicationsClosed() {
	return (
		<div className={styles.container}>
			<Image src={mascots} alt="Hacker Anteater" className={styles.mascot} />
			<div className={styles.messageBox}>
				<h1 className={styles.title}>
					Applications for ZotHacks 2026 closed on October 2nd.
				</h1>
				<hr />
				<p>
					If you submitted an application, we will release decisions shortly.
				</p>
				<p>
					If you have any other questions or concerns, feel free to contact us
					at{" "}
					<a href="mailto:zothacks2026@gmail.com">
						zothacks2026@gmail.com
					</a>
					.
				</p>
				<div className={styles.buttonContainer}>
					<PrimaryButton href="/">Return to Homepage</PrimaryButton>
				</div>
			</div>
		</div>
	);
}
