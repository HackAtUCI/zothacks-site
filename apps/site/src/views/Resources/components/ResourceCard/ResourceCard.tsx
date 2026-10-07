import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "@/lib/sanity/client";
import styles from "./ResourceCard.module.scss";

const builder = imageUrlBuilder(client);

interface ResourceCardProps {
	description: string;
	link?: string;
	logo?: unknown;
}

export default function ResourceCard({
	description,
	link,
	logo,
}: ResourceCardProps) {
	const content = (
		<div className={styles.card}>
			<div className={styles.logo} aria-hidden>
				{logo && (
					<img
						src={builder.image(logo).width(240).format("webp").url()}
						alt=""
					/>
				)}
			</div>
			<p className={styles.description}>{description}</p>
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
