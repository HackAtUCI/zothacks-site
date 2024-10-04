export const revalidate = 60;

import Landing from "./sections/Landing";
import Intro from "./sections/Intro";
import GetInvolved from "./sections/GetInvolved";
import Sponsors from "./sections/Sponsors";
import FAQ from "./sections/FAQ";

import styles from "./page.module.scss";

const Home = () => {
	return (
		<div className={styles.home}>
			<Landing />
			{/* <Intro />
			<Mentor /> */}
			<GetInvolved />
			<Sponsors />
			{/* <FAQ /> */}
		</div>
	);
};

export default Home;
