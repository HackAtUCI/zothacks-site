import RetroWindow from "@/components/RetroWindow/RetroWindow";
import styles from "./not-found.module.scss";
import AntSleepy from "@/assets/images/ant_sleepy.svg";
import Image from "next/image";

export default function NotFoundPage() {
	return (
		<div className={styles["not-found-page"]}>
			<div className={styles["main-window"]}>
				<RetroWindow
					title="404 Error"
					framedContent
				>
					<div className={styles["main-content"]}>
						<Image
							src={AntSleepy}
							alt="Info icon"
							className={styles.icon}
						/>

						<h4 className={styles.heading}>404 Error</h4>
						<h5 className={styles["sub-heading"]}>This page was not found</h5>

					</div>
				</RetroWindow>
			</div>

		</div>
	);
}
