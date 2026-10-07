/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "@/lib/sanity/client";
import styles from "./CategoryIcon.module.scss";

const builder = imageUrlBuilder(client);

interface SanityImage {
	_type: string;
	asset: {
		_ref: string;
		_type: "reference";
	};
}

interface CategoryIconProps {
	label: string;
	description?: string;
	link?: string;
	logo?: SanityImage;
}

export default function CategoryIcon({
	label,
	description,
	link,
	logo,
}: CategoryIconProps) {
	const content = (
		<div className={styles.icon}>
			<div className={styles.image} aria-hidden>
				{logo && (
					<img
						src={builder.image(logo).width(200).format("webp").url()}
						alt=""
					/>
				)}
			</div>
			<span className={styles.label}>{label}</span>
			{description && <p className={styles.description}>{description}</p>}
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
