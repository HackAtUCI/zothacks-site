export const revalidate = 60;

import Landing from "./sections/Landing";
import Sponsors from "./sections/Sponsors";
import FAQ from "./sections/FAQ";
import BackToTop from "./sections/BackToTop";
import Clubs from "./sections/Clubs/Clubs";

import styles from "./page.module.scss";
import Countdown from "./sections/Countdown";
import About from "./sections/About/About";
import Schedule from "../schedule/Schedule";
import { Resources } from "@/views";
import Login from "../login/page";
import LoginForm from "../login/LoginForm";

interface HomeProps {
	searchParams?: {
		overlay?: string;
	};
}

const Home = ({ searchParams }: HomeProps) => {
	const overlay = searchParams?.overlay;

	return (
		<div className={styles.home}>
			<Landing />
			<About />
			{/* <Countdown /> */}
			{/* <Sponsors /> */}
			{/* <Clubs /> */}
			<FAQ />
			<BackToTop />
			{(overlay === "resources" ||
				overlay === "schedule" ||
				overlay === "login") && (
				<div className={styles.overlay} role="dialog" aria-modal="true">
					<div className={styles.overlayPanel}>
						{overlay === "resources" && <Resources overlay />}
						{overlay === "schedule" && <Schedule overlay />}
						{overlay === "login" && <LoginForm returnTo="/" overlay={true} />}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
