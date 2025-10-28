"use client";
import Image from "next/image";

import LeftCharacter from "@/assets/images/LeftCharacter.png";
import RightCharacter from "@/assets/images/RightCharacter.png";
import Flashlight from "@/assets/images/flashlight.png";
import Light from "@/assets/images/light.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import GrassPatch from "@/assets/background/landing/grass-patch.png";
import CampBase from "@/assets/background/landing/Camp_base.png";
import LogShading from "@/assets/background/landing/Log_shading.png";
import Log from "@/assets/background/landing/Log.png";
import LogTexture from "@/assets/background/landing/Log_texture.png";
import Tent from "@/assets/background/landing/Tent.png";
import TentShading1 from "@/assets/background/landing/Tent_shading_1.png";
import TentShading2 from "@/assets/background/landing/Tent_shading_2.png";

import styles from "./About.module.scss";

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
				<Image
					src={CampBase}
					alt="Camp base foreground"
					className={styles.campBase}
				/>
				<Image src={GrassPatch} alt="Grass patch" className={styles.grass} />
				<div className={`${styles.side} ${styles.leftSide}`}>
					<Image
						id="hacker-application"
						src={LeftCharacter}
						alt="Left character"
						className={styles.left}
					/>
					<Image
						src={LogShading}
						alt="Log shading"
						className={styles.logShading}
					/>
					<Image src={Log} alt="Log" className={styles.log} />
					<Image
						src={LogTexture}
						alt="Log texture"
						className={styles.logTexture}
					/>
					{/* <div className={styles.prompt}>
						<p>Want to develop your first project?</p>
						<PrimaryButton href="/apply">Apply to be a hacker</PrimaryButton>
					</div> */}
				</div>

				<div className={`${styles.side} ${styles.rightSide}`}>
					<Image src={Tent} alt="Tent" className={styles.tent} />

					<div className={styles.bearWithFlashlight}>
						<Image src={Light} alt="Flashlight beam" className={styles.light} />
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
					{/* <div className={styles.prompt}>
						<p>Have experience under your belt?</p>
						<PrimaryButton href="/mentor">Apply to be a mentor</PrimaryButton>
					</div> */}
				</div>
			</div>
		</section>
	);
};

export default About;
