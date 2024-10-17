import { PortableText } from "@portabletext/react";
import urlImageBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./BackendResources.module.scss";

async function BackendResources() {
	const resources = await getResources("backend");
	return (
		<div className="container">
			{/* Card Component */}
			<div className={styles.card}>
				<h2 className={styles.title}>Backend Framework Resources</h2>
				<p className={styles.text}>
					Backend Frameworks are a variety of middleware services used to
					connect to other API and database vendors to fit your project&apos;s
					needs.
				</p>
			</div>
			<div className={styles["bottom-spacer"] + " row"}>
				{/* Sticky Notes */}
				{resources.map(
					({ _id, title, description, link, logo, background }) => (
						<div className={styles.column + " col"} key={_id}>
							<ResourceCard
								title={title}
								description={<PortableText value={description} />}
								stickerSrc={urlImageBuilder(client).image(logo).url()}
								islandBackground={urlImageBuilder(client).image(background).url()}
								links={[{ text: "Reference", link: link }]}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default BackendResources;
