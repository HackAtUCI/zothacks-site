import Image from "next/image";
import Container from "react-bootstrap/Container";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import FolderIcon from "@/assets/icons/folder-icon.svg";
import SponsorsPeter from "@/assets/images/sponsors-peter.gif";

import { SponsorCardProps} from "./SponsorCard";
import SponsorCard from "./SponsorCard";

import { getSponsors } from "./getSponsors";
import styles from "./Sponsors.module.scss";

const PLACEHOLDERS: ReadonlyArray<SponsorCardProps> = [
	{ logo: null, name: "nami"},
	{ logo: null, name: "nami"},
	{ logo: null, name: "nami"},
];

const Sponsors = async () => {
	// Keeping sanity fetcher but not using it since we don't have
	// sponsors figured out yet
	await getSponsors();


	return (
		<Container as="section" className={styles.section}>
			<div className={styles.thanksWindow}>
				<RetroWindow title="Sponsors" framedContent>
					<div className={styles.thanks}>
						<Image
							src={FolderIcon}
							alt=""
							aria-hidden
							className={styles.thanksFolder}
						/>
						<div className={styles.thanksText}>
							Thank you to our sponsors!
						</div>
					</div>
				</RetroWindow>
			</div>

			<div className={styles.mainWindow}>
				<RetroWindow title="Sponsors" framedContent>
					<div className={styles.mainContent}>
						<h2 className={styles.heading}>Sponsors</h2>
						<div className={styles.cards}>
							{PLACEHOLDERS.map(({ logo, name }) => (
								<SponsorCard logo={logo} name={name} />
							))}
						</div>
					</div>
				</RetroWindow>
				<Image
					src={SponsorsPeter}
					alt=""
					aria-hidden
					className={styles.cornerPeter}
					unoptimized
				/>
			</div>
		</Container>
	);
};

export default Sponsors;
