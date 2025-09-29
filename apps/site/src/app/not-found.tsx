"use client";

import { Button } from "react-bootstrap";
import styles from "./not-found.module.scss";
import { useRouter } from "next/navigation";


export default function NotFound() {
	const router = useRouter();
	return (
		<div className={styles["not-found-page"]}>
			<div className={styles.content}>
				<h1 className={styles.heading}>404</h1>
				<p className={styles.subtext}>Could not find requested resource</p>
				<button type="button" className={styles.button} onClick={() => router.push("/")}>
					Return Home
				</button>
			</div>
		</div>
	);
}
