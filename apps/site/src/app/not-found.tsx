import styles from "./not-found.module.scss";

export default function NotFoundPage() {
	return (
		<div className={styles["not-found-page"]}>
			<div className={styles.content}>
				<h1 className={styles.heading}>404</h1>
				<p className={styles.subtext}>
					Gone fishing! Seems this page got away…
				</p>
			</div>
		</div>
	);
}
