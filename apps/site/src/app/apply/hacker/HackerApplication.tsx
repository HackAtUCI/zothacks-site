"use client";

import { useState } from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import BaseForm from "@/components/BaseForm/BaseForm";
import ApplicationForm from "./ApplicationForm";
import ApplicationsClosed from "./ApplicationsClosed";
import HackerDisclaimer from "./HackerDisclaimer";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

import styles from "./HackerApplication.module.scss";

export default function HackerApplication() {
	const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
	const [page, setPage] = useState<1 | 2>(1);
	const deadlinePassed = hasDeadlinePassed();

	if (deadlinePassed) return <ApplicationsClosed />;

	if (!hasAcceptedDisclaimer) {
		return (
			<div className={`${styles.page} ${styles.disclaimerShell}`}>
				<HackerDisclaimer onContinue={() => setHasAcceptedDisclaimer(true)} />
			</div>
		);
	}

	const title =
		page === 1 ? "Hacker Application" : "Hacker Application (Continued)";

	return (
		<div className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title={title}>
					<BaseForm
						applyPath="/api/user/apply"
						applicationType="Hacker"
						className={styles.form}
						hideSubmit={page === 1}
					>
						<ApplicationForm page={page} onPageChange={setPage} />
					</BaseForm>
				</RetroWindow>
			</div>
		</div>
	);
}
