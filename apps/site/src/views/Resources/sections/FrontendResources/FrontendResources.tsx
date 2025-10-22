import { PortableText } from "@portabletext/react";
import urlImageBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import HeadingCard from "../../components/HeadingCard/HeadingCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./FrontendResources.module.scss";

async function FrontendResources() {
	const resources = await getResources("frontend");
	return (
		<div className="container">
			<HeadingCard
				title="Frontend Framework Resources"
				description="Frontend frameworks aid in the design of user interfaces and
					experiences. Your users will interact with your services through the
					frontend."
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

export default FrontendResources;
