import Image from "next/image";

import PeacePeter from "@/assets/images/peace-peter.png";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./PortalDashboard.module.scss";

export default function CompletedTasksBox() {
	return (
		<section className={styles.completedWindow}>
				<RetroWindow title="Completed Tasks" framedContent>
					<div className={styles.completedContent}>
						<Image src={PeacePeter} alt="" className={styles.completedPeter} />
						<p className={styles.completedText}>You&apos;re all set!</p>
					</div>
				</RetroWindow>
		</section>
	);
}
