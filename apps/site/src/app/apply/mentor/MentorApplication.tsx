"use client";

import { useState } from "react";

import MentorDisclaimer from "./MentorDisclaimer";
import MentorsForm from "./MentorsForm";

import styles from "./MentorApplication.module.scss";

export default function MentorApplication() {
	const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

	if (!hasAcceptedDisclaimer) {
		return (
			<div className={`${styles.page} ${styles.disclaimerShell}`}>
				<MentorDisclaimer onContinue={() => setHasAcceptedDisclaimer(true)} />
			</div>
		);
	}

	return <MentorsForm />;
}
