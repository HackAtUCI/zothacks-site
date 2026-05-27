import Image from "next/image";

import SponsorPlaceholder from "@/assets/images/sponsor.svg";

import styles from "./SponsorCard.module.scss";

export interface SponsorCardProps {
	logo: string | null;
	name: string;
}

const SponsorCard = ({ logo, name }: SponsorCardProps) => {
	return (
		<div className={styles.card}>
			{logo ? (
				<Image
					src={logo}
					alt={`${name} logo`}
					aria-hidden
					className={styles.image}
				/>
			) : (
				<Image
					src={SponsorPlaceholder}
					alt={`${name} logo`}
					aria-hidden
					className={styles.image}
				/>
			)}

			<div className={styles.name}>{name}</div>
		</div>
	);
};

export default SponsorCard;
