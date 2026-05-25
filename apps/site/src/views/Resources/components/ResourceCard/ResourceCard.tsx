import Link from "next/link";

import styles from "./ResourceCard.module.scss";

interface ResourceCardProps {
	description: string;
	link?: string;
}

export default function ResourceCard({ description, link }: ResourceCardProps) {
	const content = (
		<div className={styles.card}>
			<div className={styles.logo} aria-hidden />
			<p className={styles.description}>{description}</p>
		</div>
	);

	if (link) {
		return (
			<Link
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.link}
			>
				{content}
			</Link>
		);
	}

	return content;
}
