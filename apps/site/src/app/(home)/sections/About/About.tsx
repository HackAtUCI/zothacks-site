import Image from "next/image";
import Container from "react-bootstrap/Container";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PeacePeter from "@/assets/images/peace-peter.png";

import styles from "./About.module.scss";

const ROWS: ReadonlyArray<{ label: string; body: string }> = [
	{
		label: ">ZOTHACKS",
		body: "ZotHacks introduces students to the world of hackathons and web development.",
	},
	{
		label: ">PROFICIENCY",
		body: "Beginner friendly! Built for students with minimal web development experience.",
	},
	{
		label: ">BENEFITS",
		body: "We provide free technical workshops, dedicated mentors for every team, and FREE FOOD!",
	},
	{
		label: ">DURATION",
		body: "12-hours",
	},
	{
		label: ">APPLY NOW",
		body: "We encourage applicants from all backgrounds, including underrepresented minorities, majors, or genders to apply!",
	},
];

const About = () => {
	return (
		<Container as="section" className={styles.section}>
			<div className={styles.windowWrap}>
				<RetroWindow title="About ZotHacks" framedContent contentTheme="dark">
					<dl className={styles.grid}>
						{ROWS.map(({ label, body }) => (
							<div key={label} className={styles.row}>
								<dt className={styles.label}>{label}</dt>
								<dd className={styles.body}>{body}</dd>
							</div>
						))}
					</dl>
				</RetroWindow>
				<Image
					src={PeacePeter}
					alt=""
					aria-hidden
					className={styles.peacePeter}
				/>
			</div>
		</Container>
	);
};

export default About;
