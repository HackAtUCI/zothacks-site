import urlImageBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./StarterPacks.module.scss";

async function StarterPacks() {
	const resources = await getResources("starter-pack");
	return (
		<div className="container">
			<div className={styles.card}>
				<h2 className={styles.title}>Starter Pack Resources</h2>
				<p className={styles.text}>
					Various starter packs to start you off on your coding journeys at
					ZotHacks, featuring a variety of technologies and tech stacks!
				</p>
			</div>
			<div className={styles["bottom-spacer"] + " row"}>
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

export default StarterPacks;
