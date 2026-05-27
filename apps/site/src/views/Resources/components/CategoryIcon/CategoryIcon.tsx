import styles from "./CategoryIcon.module.scss";

interface CategoryIconProps {
	label: string;
}

export default function CategoryIcon({ label }: CategoryIconProps) {
	return (
		<div className={styles.icon}>
			<div className={styles.image} aria-hidden />
			<span className={styles.label}>{label}</span>
		</div>
	);
}
