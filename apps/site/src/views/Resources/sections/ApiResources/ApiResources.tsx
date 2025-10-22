import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

import ResourceCard from "../../components/ResourceCard/ResourceCard";
import HeadingCard from "../../components/HeadingCard/HeadingCard";
import { getResources } from "../../getResources";
import { client } from "@/lib/sanity/client";

import styles from "./ApiResources.module.scss";
import xLogo from "@/assets/icons/x-logo.png";

async function ApiResources() {
	const resources = await getResources("api");
	const builder = imageUrlBuilder(client);

	console.log(resources);
	// console.log('resources');
	// console.log(resources);
	return (
		<div className={`container ${styles.apiResources}`}>
			<HeadingCard
				title="API Resources"
				description="Application Programming Interface (API) are interfaces or communication protocols that simplify implementation and maintenance of software. In order to access most API's, many languages use HTTP protocol to communicate with the servers that host the API and retrieve data.."
			/>

			<div className={styles["bottom-spacer"] + " row"}>
				{resources.map(
					({ _id, title, description, link, logo, background }) => (
						<div className={styles.column + " col"} key={_id}>
							<ResourceCard
								key={_id}
								title={title}
								description={<PortableText value={description} />}
								image={builder.image(logo).url()}
								links={[{ text: "API Reference", link: link }]}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default ApiResources;
