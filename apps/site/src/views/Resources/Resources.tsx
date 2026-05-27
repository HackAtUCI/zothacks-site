import RetroWindow from "@/components/RetroWindow/RetroWindow";

import CategoryRow from "./sections/CategoryRow/CategoryRow";
import ResourceSection from "./sections/ResourceSection/ResourceSection";
import styles from "./Resources.module.scss";

export default function Resources() {
	return (
		<main className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title="Resources" framedContent closeHref="/">
					<div className={styles.content}>
						<CategoryRow />
						<ResourceSection category="api" label="API Resources" />
					</div>
				</RetroWindow>
			</div>
		</main>
	);
}
