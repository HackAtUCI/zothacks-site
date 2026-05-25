import CategoryIcon from "../../components/CategoryIcon/CategoryIcon";
import styles from "./CategoryRow.module.scss";

const CATEGORIES = [
	"API Resources",
	"Backend Framework",
	"Frontend Framework",
	"Starter Packs",
];

export default function CategoryRow() {
	return (
		<div className={styles.row}>
			{CATEGORIES.map((label) => (
				<CategoryIcon key={label} label={label} />
			))}
		</div>
	);
}
