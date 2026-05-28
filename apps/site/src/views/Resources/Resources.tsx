import RetroWindow from "@/components/RetroWindow/RetroWindow";
import clsx from "clsx";

import CategoryRow from "./sections/CategoryRow/CategoryRow";
import ResourceSection from "./sections/ResourceSection/ResourceSection";
import styles from "./Resources.module.scss";

interface ResourcesProps {
	overlay?: boolean;
}

export default function Resources({ overlay = false }: ResourcesProps) {
	const resourcesWindow = (
		<div
			className={overlay ? styles.overlayWindowWrapper : styles.windowWrapper}
		>
			<RetroWindow
				title="Resources"
				framedContent
				closeHref="/"
				snapBack={!overlay}
			>
				<div className={clsx(styles.content, overlay && styles.overlayContent)}>
					<CategoryRow />
					<ResourceSection category="api" label="API Resources" />
				</div>
			</RetroWindow>
		</div>
	);

	if (overlay) {
		return resourcesWindow;
	}

	return <main className={styles.page}>{resourcesWindow}</main>;
}
