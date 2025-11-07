import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import HeadingCard from "../../components/HeadingCard/HeadingCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./ApiResources.module.scss";

async function ApiResources() {
	const resources = await getResources("api");
	const builder = imageUrlBuilder(client);

	return (
		<div className={`container ${styles.apiResources}`}>
			<HeadingCard
				title="API Resources"
				description="Application Programming Interface (API) are interfaces or communication protocols that simplify implementation and maintenance of software. In order to access most APIs, many languages use HTTP protocol to communicate with the servers that host the API and retrieve data."
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
								image={builder.image(logo).url()}
								links={[{ text: "API Reference", link }]}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ApiResources;
