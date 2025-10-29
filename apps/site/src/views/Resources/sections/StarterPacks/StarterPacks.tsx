import { PortableText } from "@portabletext/react";
import urlImageBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import HeadingCard from "../../components/HeadingCard/HeadingCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./StarterPacks.module.scss";

async function StarterPacks() {
	const resources = await getResources("starter-pack");
	return (
		<div className={`container ${styles.starterPacks}`}>
			<HeadingCard
				title="Starter Pack Resources"
				description="Various starter packs to start you off on your coding journeys at
					ZotHacks, featuring a variety of technologies and tech stacks!"
			/>
			<div className={styles["bottom-spacer"] + " row"}>
				{resources.map(
					({ _id, title, description, link, logo, background }) => (
						<div className={styles.column + " col"} key={_id}>
							<ResourceCard
								title={title}
								description={<PortableText value={description} />}
								image={urlImageBuilder(client).image(logo).url()}
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
