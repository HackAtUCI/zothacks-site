"use client";

import Image from "next/image";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import anteater_left from "@/assets/images/involved_anteater_left.png";
import anteater_right from "@/assets/images/involved_anteater_right.png";
import styles from "./GetInvolved.module.scss";

const GetInvolved = () => {
	const sectionHeading = <h2 className={styles.headingText}>GET INVOLVED</h2>;
	const leftBubbleText = <p>Want to develop your first project?</p>;
	const rightBubbleText = (
		<p>Otherwise, if you have some experience under your belt,</p>
	);
	const applyLink = (
		<Button type="button" className={styles.applyButton} disabled>
			Hacker Apps Closed
		</Button>
	);

	const mentorLink = (
		<Button
			href="/mentor"
			type="button"
			className={styles.applyButton}
			disabled
		>
			Mentor Apps Closed
		</Button>
	);

	return (
		<Container className={styles.container} as="section">
			{sectionHeading}
			<div>
				<div className={styles.speechSectionLeft}>
					<div className={styles.speechBubbleOuterLeft}>
						<div className={styles.speechBubbleLeft}>
							{leftBubbleText}
							{applyLink}
						</div>
					</div>
					<div className={styles.anteaterContainerLeft}>
						<Image
							className={styles.anteaterImage}
							src={anteater_left.src}
							alt="A cartoon anteater sitting on a ring buoy coding"
						/>
					</div>
				</div>
				<div className={styles.speechSectionRight}>
					<div className={styles.speechBubbleOuterRight}>
						<div className={styles.speechBubbleRight}>
							{rightBubbleText}
							{mentorLink}
						</div>
					</div>
					<div className={styles.anteaterContainerRight}>
						<Image
							className={styles.anteaterImage}
							src={anteater_right.src}
							alt="A cartoon anteater captain sitting on a ring buoy"
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default GetInvolved;
