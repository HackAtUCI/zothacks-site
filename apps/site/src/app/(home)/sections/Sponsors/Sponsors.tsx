/* eslint-disable @next/next/no-img-element */
import { getSponsors } from "./getSponsors";
import styles from "./Sponsors.module.scss";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import clip from "./clip.svg";

const builder = imageUrlBuilder(client);

const Sponsors = async () => {
	const sponsors = await getSponsors();

	return (
		<section className={styles.container}>
			<div className={styles.clipboard}>
				<img className={styles.clip} src={clip.src} alt="" />
				<h2 className={styles.title}>Sponsors</h2>
				<div className={styles.logos}>
					{sponsors.sponsors.map(({ _key, name, url, logo }) => (
						<a key={_key} href={url} target="_blank" rel="noopener noreferrer">
							<img
								className={styles.logo}
								src={builder.image(logo).format("webp").url()}
								alt={name + " logo"}
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default Sponsors;
