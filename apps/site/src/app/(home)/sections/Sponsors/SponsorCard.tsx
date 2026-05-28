import Image from "next/image";

import SponsorPlaceholder from "@/assets/images/sponsor.svg";

import styles from "./SponsorCard.module.scss";

export interface SponsorCardProps {
	name: string;
	placeholder?: boolean;
}

const SponsorCard = ({ name }: SponsorCardProps) => {
	return (
		<div className={styles.card}>
			<Image
				src={SponsorPlaceholder}
				alt={`${name} logo`}
				aria-hidden
				className={styles.image}
			/>
			<div className={styles.name}>{name}</div>
		</div>
	);
};

export default SponsorCard;
