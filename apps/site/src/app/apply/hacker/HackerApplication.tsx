"use client";

import { useState } from "react";

import ApplicationsClosed from "./ApplicationsClosed";
import HackerDisclaimer from "./HackerDisclaimer";
import HackerForm from "./HackerForm";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
	const deadlinePassed = hasDeadlinePassed();

	if (deadlinePassed) return <ApplicationsClosed />;

	if (!hasAcceptedDisclaimer) {
		return (
			<div className={`${styles.page} ${styles.disclaimerShell}`}>
				<HackerDisclaimer onContinue={() => setHasAcceptedDisclaimer(true)} />
			</div>
		);
	}

	return <HackerForm />;
}
