import { getResources } from "../../getResources";
import ResourceCard from "../../components/ResourceCard/ResourceCard";

import styles from "./ResourceSection.module.scss";

interface ResourceSectionProps {
	category: string;
	label: string;
}

async function ResourceSection({ category, label }: ResourceSectionProps) {
	const resources = await getResources(category);

	if (resources.length === 0) return null;

	return (
		<div className={styles.section}>
			<h3 className={styles.label}>{label}</h3>
			<div className={styles.row}>
				{resources.map(({ _id, description, link }) => {
					const plainText =
						description[0]?.children?.map((c) => c.text).join("") || "";
					return <ResourceCard key={_id} description={plainText} link={link} />;
				})}
			</div>
		</div>
	);
}

export default ResourceSection;
