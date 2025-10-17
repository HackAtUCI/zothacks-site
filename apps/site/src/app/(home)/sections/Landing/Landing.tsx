"use client";

import Image from "next/image";

import Title from "./Title";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Moon from "@/assets/background/landing/moon.svg";
import Trees from "@/assets/background/landing/main-trees.svg";

import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<Image src={Moon} alt="moon" className={styles.moon} />

			<section className={styles.landing}>
				<Image src={Trees} alt="trees" className={styles.trees} />
				<Title />
				<div className={styles.errorBanner}>
					<p>
						<strong className={styles.important}>
							IMPORTANT: If you applied as a hacker after Oct 14, 10:53 p.m.
						</strong>{" "}
						<br />
						your application was not saved to our system.
					</p>
					<ul>
						<li>
							We have disabled the application page temporarily and will resolve
							it shortly.
						</li>
						<li>
							If you applied during that time, you will need to reapply once
							we&apos;re back online.
						</li>
						<li>
							Hacker applications are NOT first-come, first-served, so applying
							later won&apos;t hurt your chances at all.
						</li>
					</ul>
					<p>
						We truly apologize for the inconvenience and appreciate your
						patience.
					</p>
				</div>
				{/* <PrimaryButton
					href="#hacker-application"
					className={styles.applyButton}
				>
					Apply Now
				</PrimaryButton> */}
			</section>
		</div>
	);
};

export default Landing;
