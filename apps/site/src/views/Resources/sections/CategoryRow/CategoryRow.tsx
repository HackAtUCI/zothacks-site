import CategoryIcon from "../../components/CategoryIcon/CategoryIcon";
import { getResources } from "../../getResources";
import styles from "./CategoryRow.module.scss";

export default async function CategoryRow() {
	const resources = await getResources("featured");

	if (resources.length === 0) return null;

	return (
		<div className={styles.row}>
			{resources.map(({ _id, title, description, link, logo }) => {
				const plainText =
					description[0]?.children?.map((c) => c.text).join("") || "";
				return (
					<CategoryIcon
						key={_id}
						label={title}
						description={plainText}
						link={link}
						logo={logo}
					/>
				);
			})}
		</div>
	);
}
