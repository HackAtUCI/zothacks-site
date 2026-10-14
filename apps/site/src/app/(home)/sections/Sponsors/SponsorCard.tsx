/* eslint-disable @next/next/no-img-element */

import styles from "./SponsorCard.module.scss";

export interface SponsorCardProps {
	name: string;
	logoUrl: string;
	url?: string;
	featured?: boolean;
}

const SponsorCard = ({ name, logoUrl, url, featured }: SponsorCardProps) => {
	const content = (
		<div className={`${styles.card} ${featured ? styles.featured : ""}`}>
			<img src={logoUrl} alt={`${name} logo`} className={styles.image} />
			<div className={styles.name}>{name}</div>
		</div>
	);

	return url ? (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={styles.link}
		>
			{content}
		</a>
	) : (
		content
	);
};

export default SponsorCard;
