"use client";

import { useEffect, useState } from "react";

import ApplicationsClosed from "./ApplicationsClosed";
import HackerDisclaimer from "./HackerDisclaimer";
import HackerForm from "./HackerForm";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

import styles from "./HackerApplication.module.scss";

type HackerStep = "disclaimer" | "form";

const defaultStep: HackerStep = "disclaimer";
const hackerSteps: ReadonlyArray<HackerStep> = ["disclaimer", "form"];

function getStepFromUrl() {
	const step = new URL(window.location.href).searchParams.get("step");
	return hackerSteps.includes(step as HackerStep)
		? (step as HackerStep)
		: defaultStep;
}

export default function HackerApplication() {
	const [step, setStep] = useState<HackerStep>(defaultStep);
	const deadlinePassed = hasDeadlinePassed();

	useEffect(() => {
		setStep(getStepFromUrl());

		const syncStepFromHistory = () => setStep(getStepFromUrl());
		window.addEventListener("popstate", syncStepFromHistory);

		return () => window.removeEventListener("popstate", syncStepFromHistory);
	}, []);

	function updateStep(nextStep: HackerStep) {
		const url = new URL(window.location.href);
		if (nextStep === defaultStep) {
			url.searchParams.delete("step");
		} else {
			url.searchParams.set("step", nextStep);
		}

		window.history.pushState(null, "", url);
		setStep(nextStep);
	}

	if (deadlinePassed) return <ApplicationsClosed />;

	if (step === "disclaimer") {
		return (
			<div className={`${styles.page} ${styles.disclaimerShell}`}>
				<HackerDisclaimer onContinue={() => updateStep("form")} />
			</div>
		);
	}

	return <HackerForm onBack={() => updateStep("disclaimer")} />;
}
