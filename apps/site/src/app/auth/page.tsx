import { Suspense } from "react";

import styles from "./Auth.module.scss";
import AuthCallbackClient from "./AuthCallbackClient";

const AuthFallback = () => (
	<div className={styles.auth}>
		<p>Signing you in...</p>
	</div>
);

export default function AuthCallback() {
	return (
		<Suspense fallback={<AuthFallback />}>
			<AuthCallbackClient />
		</Suspense>
	);
}
