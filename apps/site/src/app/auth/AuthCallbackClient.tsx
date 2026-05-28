"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./Auth.module.scss";

export default function AuthCallbackClient() {
	const params = useSearchParams();
	const [status, setStatus] = useState("Signing you in...");

	useEffect(() => {
		const code = params.get("code");
		if (!code) {
			setStatus("Missing code. Please try logging in again.");
			return;
		}

		(async () => {
			try {
				const res = await fetch(`/api/saml/exchange?code=${code}`, {
					method: "GET",
					credentials: "include",
				});

				if (res.ok) {
					setStatus("Login successful! Redirecting...");
					setTimeout(
						// Use window.location instead of router.push in order
						// to force reload the page to allow user identity to
						// update with the new status
						() => (window.location.href = "/#hacker-application"),
						1000,
					);
				} else {
					const text = await res.text();
					setStatus(`Login failed: ${text}`);
				}
			} catch (err) {
				console.error(err);
				setStatus("Something went wrong. Please try again.");
			}
		})();
	}, [params]);

	return (
		<div className={styles.auth}>
			<p>{status}</p>
		</div>
	);
}
