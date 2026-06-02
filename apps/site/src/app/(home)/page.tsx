export const revalidate = 60;

import Landing from "./sections/Landing";
import GetInvolved from "./sections/GetInvolved";
import FAQ from "./sections/FAQ";
import Clubs from "./sections/Clubs/Clubs";

import styles from "./page.module.scss";
import Countdown from "./sections/Countdown";

const Home = () => {
	return (
		<div className={styles.home}>
			<Landing />
			<GetInvolved />
			<Countdown />
			<Clubs />
			<FAQ />
		</div>
	);
};

export default Home;
