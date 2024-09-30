/* eslint-disable @next/next/no-img-element */
import { getSponsors } from "./getSponsors";
import styles from "./Sponsors.module.scss";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const Sponsors = async () => {
	const sponsors = await getSponsors();

	// placeholder sponsors (replace this section)
	const fakeSponsorNames = [
		"Ryan Yang",
		"Ryan Yang",
		"Ryan Yang",
		"Ryan Yang",
		"Ryan Yang",
	];
	const fakeSponsorLogos = fakeSponsorNames.map((name, index) => ({
		_key: `fake-sponsor-${index}`,
		name,
		url: "#",
		logo: {
			asset: {
				_ref: "image-placeholder",
			},
		},
	}));

	const allSponsors = [...sponsors.sponsors, ...fakeSponsorLogos];

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>SPONSORS</h2>
			<div className={styles.logos}>
				{allSponsors.map(({ _key, name, url, logo }) => (
					<a
						key={_key}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.logo}
					>
						{logo.asset._ref === "image-placeholder" ? (
							<div className={styles.placeholderLogo}>{name}</div>
						) : (
							<img
								src={builder.image(logo).format("webp").url()}
								alt={name + " logo"}
							/>
						)}
					</a>
				))}
			</div>
		</section>
	);
};

export default Sponsors;
