/* eslint-disable @next/next/no-img-element */
import { getSponsors } from "./getSponsors";
import styles from "./Sponsors.module.scss";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Container from "react-bootstrap/Container";

const builder = imageUrlBuilder(client);

const Sponsors = async () => {
	const sponsors = await getSponsors();

	return (
		<Container as="section">
			<h2 className={styles.title}>SPONSORS</h2>
			<div className={styles.logos}>
				{sponsors.sponsors.map(({ _key, name, url, logo, tier }) => (
					<a
						key={_key}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className={`${styles.logo} ${styles[tier]}`}
					>
						<img
							src={builder.image(logo).format("webp").url()}
							alt={name + " logo"}
						/>
					</a>
				))}
			</div>
		</Container>
	);
};

export default Sponsors;
