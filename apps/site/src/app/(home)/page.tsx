export const revalidate = 60;

import Landing from "./sections/Landing";
import Sponsors from "./sections/Sponsors";
import FAQ from "./sections/FAQ";
import BackToTop from "./sections/BackToTop";
import Clubs from "./sections/Clubs/Clubs";

import styles from "./page.module.scss";
import Countdown from "./sections/Countdown";
import About from "./sections/About/About";

const Home = () => {
	return (
		<div className={styles.home}>
			<Landing />
			<About />
			{/* <Countdown /> */}
			<Sponsors />
			{/* <Clubs /> */}
			<FAQ />
			<BackToTop />
		</div>
	);
};

export default Home;
