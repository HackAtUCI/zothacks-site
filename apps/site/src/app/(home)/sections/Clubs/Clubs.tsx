/* eslint-disable @next/next/no-img-element */
import Container from "react-bootstrap/Container";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity/client";
import { getClubs } from "./getClubs";
import styles from "./Clubs.module.scss";

const builder = imageUrlBuilder(client);

const Clubs = async () => {
	const clubs = await getClubs();

	return (
		<Container as="section">
			<h2 className={styles.title}>PARTNER CLUBS</h2>
			<div className={styles.logos}>
				{clubs.clubs.map(({ _key, name, url, logo }) => (
					<a
						key={_key}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.logo}
					>
						<img
							src={builder.image(logo).width(500).format("webp").url()}
							alt={name + " logo"}
						/>
					</a>
				))}
			</div>
		</Container>
	);
};

export default Clubs;
