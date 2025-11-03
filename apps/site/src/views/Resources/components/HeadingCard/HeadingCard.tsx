import styles from "./HeadingCard.module.scss";

interface HeadingCardProps {
	title: string;
	description: string;
}

export default function HeadingCard({ title, description }: HeadingCardProps) {
	return (
		<div className={styles.card}>
			<div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>
			</div>
		</div>
	);
}
