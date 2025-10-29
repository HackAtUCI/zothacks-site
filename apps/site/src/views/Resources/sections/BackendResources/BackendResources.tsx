import { PortableText } from "@portabletext/react";
import urlImageBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import HeadingCard from "../../components/HeadingCard/HeadingCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./BackendResources.module.scss";

async function BackendResources() {
	const resources = await getResources("backend");
	return (
		<div className="container">
			<HeadingCard
				title="Backend Framework Resources"
				description="Backend Frameworks are a variety of middleware services used to
					connect to other API and database vendors to fit your project's
					needs."
			/>
			<div className={styles["bottom-spacer"] + " row"}>
				{resources.map(({ _id, title, description, link, logo }) => (
					<div className={styles.column + " col"} key={_id}>
						<ResourceCard
							title={title}
							description={<PortableText value={description} />}
							image={urlImageBuilder(client).image(logo).url()}
							links={[{ text: "Reference", link: link }]}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default BackendResources;
