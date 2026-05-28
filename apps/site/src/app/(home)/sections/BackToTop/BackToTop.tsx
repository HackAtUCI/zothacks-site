"use client";

import Image from "next/image";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import warningIcon from "@/assets/icons/warning.svg";
import sittingPeter from "@/assets/images/sitting_peter.svg";

import styles from "./BackToTop.module.scss";

const BackToTop = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<section className={styles.container}>
			<div className={styles.windowWrapper}>
				<RetroWindow
					title="Warning"
					framedContent
					decoration={
						<Image
							src={sittingPeter}
							alt=""
							className={styles.sittingPeter}
							aria-hidden
						/>
					}
				>
					<div className={styles.content}>
						<div className={styles.messageRow}>
							<Image
								src={warningIcon}
								alt=""
								width={40}
								height={36}
								aria-hidden
							/>
							<p className={styles.message}>You&apos;ve gone too far!</p>
						</div>
						<button
							type="button"
							className={styles.backToTopButton}
							onClick={scrollToTop}
						>
							Back to Top
						</button>
					</div>
				</RetroWindow>
			</div>
		</section>
	);
};

export default BackToTop;
