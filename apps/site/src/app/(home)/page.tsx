export const revalidate = 60;

import Landing from "./sections/Landing";
import Intro from "./sections/Intro";
import Mentor from "./sections/Mentor";
import Sponsors from "./sections/Sponsors";
import FAQ from "./sections/FAQ";
import Footer from "../../components/Footer/Footer";

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={styles.home}>
			<Landing />
			{/* <Intro />
			<Mentor />
			<Sponsors />
			<FAQ /> */}
			<Footer />
		</div>
	);
};

export default Home;
