import Image, { StaticImageData } from "next/image";
import styles from "./StatusIndicator.module.scss";

interface StatusIndicatorProps {
	icon: StaticImageData;
	dark: boolean;
	children: React.ReactNode;
}

export default function StatusIndicator({
	icon,
	dark,
	children,
}: StatusIndicatorProps) {
	return (
		<div
			className={styles.indicator + " " + (dark ? styles.dark : styles.light)}
		>
			<p>{children}</p>
			<Image src={icon} alt="Status icon" />
		</div>
	);
}
