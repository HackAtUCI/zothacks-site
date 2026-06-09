"use client";

import { useEffect, useState } from "react";

import MentorDisclaimer from "./MentorDisclaimer";
import MentorIntro from "./MentorIntro";
import MentorsForm from "./MentorsForm";

import styles from "./MentorApplication.module.scss";

type MentorStep = "disclaimer" | "intro" | "form";

const defaultStep: MentorStep = "disclaimer";
const mentorSteps: ReadonlyArray<MentorStep> = ["disclaimer", "intro", "form"];

function getStepFromUrl() {
	const step = new URL(window.location.href).searchParams.get("step");
	return mentorSteps.includes(step as MentorStep)
		? (step as MentorStep)
		: defaultStep;
}

export default function MentorApplication() {
	const [step, setStep] = useState<MentorStep>(defaultStep);

	useEffect(() => {
		setStep(getStepFromUrl());

		const syncStepFromHistory = () => setStep(getStepFromUrl());
		window.addEventListener("popstate", syncStepFromHistory);

		return () => window.removeEventListener("popstate", syncStepFromHistory);
	}, []);

	function updateStep(nextStep: MentorStep) {
		const url = new URL(window.location.href);
		if (nextStep === defaultStep) {
			url.searchParams.delete("step");
		} else {
			url.searchParams.set("step", nextStep);
		}

		window.history.pushState(null, "", url);
		setStep(nextStep);
	}

	if (step === "disclaimer") {
		return (
			<div className={`${styles.page} ${styles.disclaimerShell}`}>
				<MentorDisclaimer onContinue={() => updateStep("intro")} />
			</div>
		);
	}

	if (step === "intro") {
		return (
			<div className={`${styles.page} ${styles.introShell}`}>
				<MentorIntro
					onBack={() => updateStep("disclaimer")}
					onContinue={() => updateStep("form")}
				/>
			</div>
		);
	}

	return <MentorsForm />;
}
