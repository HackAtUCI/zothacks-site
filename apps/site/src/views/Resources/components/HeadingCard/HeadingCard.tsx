import Image from "next/image";
import resourcesBang from "@/assets/images/resources-bang.svg";

import styles from "./HeadingCard.module.scss";

interface HeadingCardProps {
	title: string;
	description: string;
}

export default function HeadingCard({ title, description }: HeadingCardProps) {
	return (
		<div className={styles.card}>
			<Image
				className={styles.bang}
				src={resourcesBang}
				alt="exclamation mark"
			/>
			<div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>
			</div>
		</div>
	);
}
