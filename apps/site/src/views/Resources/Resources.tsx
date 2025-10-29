import backMountains from "@/assets/background/resources/back-mountains.png";
import frontMountains from "@/assets/background/resources/front-mountains.png";
import styles from "./Resources.module.scss";
import Landing from "./sections/Landing/Landing";
import ApiResources from "./sections/ApiResources/ApiResources";
import BackendResources from "./sections/BackendResources/BackendResources";
import FrontendResources from "./sections/FrontendResources/FrontendResources";
import StarterPacks from "./sections/StarterPacks/StarterPacks";

export default function Resources() {
	return (
		<div className={styles.resources}>
			<Landing />
			<ApiResources />
			<BackendResources />
			<FrontendResources />
			<StarterPacks />
		</div>
	);
}
