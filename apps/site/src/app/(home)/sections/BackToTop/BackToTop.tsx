"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import warningIcon from "@/assets/icons/warning.svg";
import sittingPeter from "@/assets/images/sitting-peter.gif";
import { scaleIn } from "@/components/animation";

import styles from "./BackToTop.module.scss";

const BackToTop = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<section className={styles.container}>
			<motion.div
				className={styles.windowWrapper}
				variants={scaleIn}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
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
						<PrimaryButton
							type="button"
							variant="small"
							className={styles.backToTopButton}
							onClick={scrollToTop}
						>
							Back to Top
						</PrimaryButton>
					</div>
				</RetroWindow>
			</motion.div>
		</section>
	);
};

export default BackToTop;
