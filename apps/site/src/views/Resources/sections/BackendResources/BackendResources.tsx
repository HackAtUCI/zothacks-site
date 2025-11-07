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
			<div className={styles["bottom-spacer"]}>
				{resources.map(({ _id, title, description, link, logo }) => {
					const plainText =
						description[0]?.children?.map((c: any) => c.text).join("") || "";

					return (
						<div className={styles.column} key={_id}>
							<ResourceCard
								key={_id}
								title={title}
								description={plainText}
								image={urlImageBuilder(client).image(logo).url()}
								links={[{ text: "API Reference", link }]}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default BackendResources;
