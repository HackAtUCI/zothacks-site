import styles from "./Resources.module.scss";
import Figures from "./sections/Figures/Figures";
import Landing from "./sections/Landing/Landing";
import ApiResources from "./sections/ApiResources/ApiResources";
import BackendResources from "./sections/BackendResources/BackendResources";
import FrontendResources from "./sections/FrontendResources/FrontendResources";
import StarterPacks from "./sections/StarterPacks/StarterPacks";

export default function Resources() {
	return (
		<div className={styles.resources}>
			<Figures />
			<Landing />
			<ApiResources />
			<BackendResources />
			<FrontendResources />
			<StarterPacks />
		</div>
	);
}
