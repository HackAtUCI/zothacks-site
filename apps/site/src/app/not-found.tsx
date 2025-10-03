import { Button } from "react-bootstrap";
import styles from "./not-found.module.scss";

export default function NotFound() {
	return (
		<div className={styles["not-found-page"]}>
			<div className={styles.content}>
				<h1 className={styles.heading}>404</h1>
				<p className={styles.subtext}>Could not find requested resource</p>
				<Button className={styles.button} href="/">
					Return Home
				</Button>
			</div>
		</div>
	);
}
