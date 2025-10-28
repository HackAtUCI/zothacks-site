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
				{/* <PrimaryButton
					href="#hacker-application"
					className={styles.applyButton}
				>
					Apply Now
				</PrimaryButton> */}
				<div className={styles.errorBanner}>
					<p>
						<strong className={styles.important}>
							IMPORTANT: If you applied as a hacker between <br />
							Oct. 14, 11:59 p.m. and Oct. 17, 4:00 p.m.
						</strong>{" "}
						<br />
						your application was not saved to our system due to a timing issue.
					</p>
					<ul>
						<li>If you applied during that time, you will need to reapply.</li>
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
			</section>
		</div>
	);
};

export default Landing;
