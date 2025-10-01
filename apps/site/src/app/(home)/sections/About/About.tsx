"use client";
import Image from "next/image";

import styles from "./About.module.scss";
import LeftCharacter from "@/assets/images/LeftCharacter.png";
import RightCharacter from "@/assets/images/RightCharacter.png";
import Flashlight from "@/assets/images/flashlight.png";
import Light from "@/assets/images/light.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const About = () => {
	return (
		<section className={styles.about}>
			<div className={styles.content}>
				<h3 className={styles.aboutTitle}>What is ZotHacks?</h3>
				<p className={styles.aboutText}>
					ZotHacks is a 12-hour hackathon designed for beginners where students
					with minimal computer science experience will learn to build their
					first CS project. Through ZotHacks, we introduce these students to the
					world of hackathons and web development by providing technical
					workshops, dedicated mentors for every team, and free food! We
					encourage applicants from all backgrounds, including underrepresented
					minorities, majors, or genders to apply!
				</p>
			</div>
			{/* Characters + call-to-action text/buttons */}
			<div className={styles.characters}>
				<div className={`${styles.side} ${styles.leftSide}`}>
					<Image
						src={LeftCharacter}
						alt="Left character"
						className={styles.left}
					/>

					<p className={styles.prompt}>Want to develop your first project?</p>
					<PrimaryButton href="/hacker">Apply to be a hacker</PrimaryButton>
				</div>

				<div className={`${styles.side} ${styles.rightSide}`}>
					<div className={styles.bearWithFlashlight}>
						{/* beam behind */}
						<Image src={Light} alt="Flashlight beam" className={styles.light} />

						{/* flashlight object */}
						<Image
							src={Flashlight}
							alt="Flashlight"
							className={styles.flashlight}
						/>

						{/* character */}
						<Image
							src={RightCharacter}
							alt="Right character"
							className={styles.right}
						/>
					</div>

					<p className={styles.prompt}>Have experience under your belt?</p>
					<PrimaryButton href="/mentor">Apply to be a mentor</PrimaryButton>
				</div>
			</div>
		</section>
	);
};

export default About;
