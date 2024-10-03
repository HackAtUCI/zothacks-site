export const revalidate = 60;

import Image from "next/image";

import beachBall from "@/assets/images/intro-beach-ball.svg";
import coastAnteater from "@/assets/images/intro-coast-anteater.svg";
import wAnteater from "@/assets/images/intro-water-anteater.svg";
import wAnteaterShadow from "@/assets/images/intro-water-anteater-shadow.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import Landing from "./sections/Landing";
import Intro from "./sections/Intro";
import Mentor from "./sections/Mentor";
import Sponsors from "./sections/Sponsors";
import FAQ from "./sections/FAQ";

import styles from "./page.module.scss";

interface CharacterProps {
	src: StaticImport;
	styles: string;
}

function Character({ src, styles }: CharacterProps) {
	return (
		<Image
			src={src}
			alt="Character design"
			className={styles}
			style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
		/>
	);
}
const Home = () => {
	return (
		<div className={styles.home}>
			<Character src={beachBall} styles={styles.beachBall} />
			<Character src={coastAnteater} styles={styles.coastAnteater} />
			{/* <Character src={wAnteater} styles={styles.wAnteater} />
			<Character src={wAnteaterShadow} styles={styles.wAnteaterShadow} /> */}
			<Landing />
			<Intro />
			{/* <Mentor />
			<Sponsors />
			<FAQ /> */}
		</div>
	);
};

export default Home;
