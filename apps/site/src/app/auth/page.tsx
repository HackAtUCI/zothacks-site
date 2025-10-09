"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallback() {
	const params = useSearchParams();
	const router = useRouter();
	const [status, setStatus] = useState("Signing you in...");

	useEffect(() => {
		const code = params.get("code");
		if (!code) {
			setStatus("Missing code. Please try logging in again.");
			router.push("/");
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
					setTimeout(() => router.push("/#hacker-application"), 1000);
				} else {
					const text = await res.text();
					setStatus(`Login failed: ${text}`);
				}
			} catch (err) {
				console.error(err);
				setStatus("Something went wrong. Please try again.");
			}
		})();
	}, [params, router]);

	return (
		<div className="flex items-center justify-center h-screen">
			<p>{status}</p>
		</div>
	);
}
