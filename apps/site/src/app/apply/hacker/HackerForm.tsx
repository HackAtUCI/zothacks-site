"use client";

import {
	useState,
	type FormEvent,
	type InvalidEvent,
	type MouseEvent,
	type ReactNode,
} from "react";

import BaseForm from "@/components/BaseForm/BaseForm";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";

import styles from "./HackerForm.module.scss";

const pronounOptions = [
	"he/him/his",
	"she/her/hers",
	"they/them/theirs",
	"other",
];
const dietaryOptions = [
	"I can eat anything, including the following (chicken, beef, pork)",
	"No Pork",
	"No Beef",
	"Vegetarian",
	"Vegan",
	"Other (Please specify)",
];
const yearOptions = [
	"1st Year",
	"2nd Year",
	"3rd Year",
	"4th Year",
	"5th Year",
	"Graduate Student",
	"Graduated",
];
const majorOptions = [
	"Aerospace Engineering",
	"Biomedical Engineering",
	"Business Administration",
	"Business Economics",
	"Business Information Management",
	"Chemical Engineering",
	"Civil Engineering",
	"Computer Game Science",
	"Computer Science",
	"Computer Science and Engineering",
	"Computer Engineering",
	"Data Science",
	"Electrical Engineering",
	"Environmental Engineering",
	"Software Engineering",
	"Informatics",
	"Materials Science and Engineering",
	"Mechanical Engineering",
	"Other - Claire Trevor School of the Arts",
	"Other - School of Biological Sciences",
	"Other - School of Education",
	"Other - School of Humanities",
	"Other - Dept. of Pharmaceutical Sciences",
	"Other - School of Physical Sciences",
	"Other - Program in Public Health",
	"Other - School of Social Ecology",
	"Other - School of Social Sciences",
	"Undeclared",
	"Other",
];
const wordLimits = {
	collaboration_saq: 100,
	tech_inspiration_saq: 100,
	uci_gift_saq: 75,
} as const;

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function countWords(value: string) {
	return value.trim().split(/\s+/).filter(Boolean).length;
}

export default function HackerForm() {
	const [page, setPage] = useState<1 | 2>(1);
	const [pronouns, setPronouns] = useState("");
	const [dietary, setDietary] = useState<string[]>([]);
	const [major, setMajor] = useState("");
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});
	const [wordCounts, setWordCounts] = useState<Record<string, number>>({
		collaboration_saq: 0,
		tech_inspiration_saq: 0,
		uci_gift_saq: 0,
	});

	const p1 = page === 1;
	const title =
		page === 1 ? "Hacker Application" : "Hacker Application (Continued)";

	function getValidationMessage(field: FieldElement) {
		if (field.validity.valueMissing) {
			if (field.name === "dietary_restrictions") {
				return "Select at least one dietary option.";
			}
			if (field.type === "radio") return "Select one option.";
			if (field.tagName === "SELECT") return "Select an option.";
			return "This field is required.";
		}
		if (field.validity.typeMismatch) return "Enter a valid URL.";
		return field.validationMessage || "Please fix this field.";
	}

	function clearError(name: string) {
		setValidationErrors((prev) => {
			if (!prev[name]) return prev;
			const next = { ...prev };
			delete next[name];
			return next;
		});
	}

	function setFieldError(field: FieldElement) {
		if (!field.name) return;
		setValidationErrors((prev) => ({
			...prev,
			[field.name]: getValidationMessage(field),
		}));
	}

	function updateFieldValidity(field: FieldElement) {
		if (!field.name) return;

		if (field instanceof HTMLTextAreaElement && field.name in wordLimits) {
			const limit = wordLimits[field.name as keyof typeof wordLimits];
			const words = countWords(field.value);

			setWordCounts((prev) => ({ ...prev, [field.name]: words }));
			field.setCustomValidity(
				words > limit ? `Keep this response to ${limit} words or fewer.` : "",
			);
		}

		if (field.checkValidity()) {
			clearError(field.name);
		} else if (validationErrors[field.name]) {
			setFieldError(field);
		}
	}

	function handleInvalid(event: InvalidEvent<HTMLDivElement>) {
		const field = event.target as FieldElement;
		if (!field.name) return;

		event.preventDefault();
		setFieldError(field);
	}

	function handleFormChange(event: FormEvent<HTMLDivElement>) {
		const field = event.target as EventTarget;
		if (
			field instanceof HTMLInputElement ||
			field instanceof HTMLSelectElement ||
			field instanceof HTMLTextAreaElement
		) {
			updateFieldValidity(field);
		}
	}

	function handleDietaryChange(option: string, checked: boolean) {
		setDietary((prev) =>
			checked
				? prev.includes(option)
					? prev
					: [...prev, option]
				: prev.filter((v) => v !== option),
		);
		if (checked) clearError("dietary_restrictions");
	}

	function errorMessage(name: string): ReactNode {
		if (!validationErrors[name]) return null;
		return <span className={styles.error}>{validationErrors[name]}</span>;
	}

	function isOtherPronounsSelected() {
		return pronouns.toLowerCase() === "other";
	}

	function isOtherDietarySelected() {
		return (
			dietary.includes("Other") || dietary.includes("Other (Please specify)")
		);
	}

	function handleContinue(e: MouseEvent<HTMLButtonElement>) {
		const form = e.currentTarget.closest("form");
		if (form && !form.checkValidity()) {
			form.reportValidity();
			return;
		}
		setPage(2);
	}

	return (
		<div className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title={title}>
					<BaseForm
						applyPath="/api/user/apply"
						applicationType="Hacker"
						className={styles.form}
						hideSubmit={p1}
					>
						{/* ── Page 1 ── */}
						<div
							className={p1 ? undefined : styles.hidden}
							onInvalidCapture={handleInvalid}
							onChangeCapture={handleFormChange}
							onInputCapture={handleFormChange}
						>
							<div className={styles.applicationContainer}>
								<div className={styles.row}>
									<label className={styles.field}>
										<span className={`${styles.label} ${styles.required}`}>
											First Name
										</span>
										<input
											className={styles.input}
											type="text"
											name="first_name"
											required={p1}
										/>
										{errorMessage("first_name")}
									</label>
									<label className={styles.field}>
										<span className={`${styles.label} ${styles.required}`}>
											Last Name
										</span>
										<input
											className={styles.input}
											type="text"
											name="last_name"
											required={p1}
										/>
										{errorMessage("last_name")}
									</label>
								</div>

								<fieldset>
									<span className={`${styles.label} ${styles.required}`}>
										Preferred Pronouns
									</span>
									<div className={styles.inlineGroup}>
										{pronounOptions.map((option) => (
											<label key={option} className={styles.option}>
												<input
													type="radio"
													name="pronouns"
													value={option}
													required={p1}
													checked={pronouns === option}
													onChange={() => {
														setPronouns(option);
														clearError("pronouns");
													}}
												/>
												<span>{option}</span>
											</label>
										))}
									</div>
									{errorMessage("pronouns")}
									{isOtherPronounsSelected() && (
										<div className={styles.otherField}>
											<label className={styles.field}>
												<span className={`${styles.label} ${styles.required}`}>
													Specify other pronouns
												</span>
												<input
													className={styles.input}
													type="text"
													name="_other_pronouns"
													required={p1}
												/>
												{errorMessage("_other_pronouns")}
											</label>
										</div>
									)}
								</fieldset>

								<fieldset>
									<span className={`${styles.label} ${styles.required}`}>
										You must be 18 years or older to participate in ZotHacks.
										Will you meet this requirement by October 16 2026?
									</span>
									<div className={styles.inlineGroup}>
										<label className={styles.option}>
											<input
												type="radio"
												name="is_18_older"
												value="Yes"
												required={p1}
											/>
											<span>Yes</span>
										</label>
										<label className={styles.option}>
											<input
												type="radio"
												name="is_18_older"
												value="No"
												required={p1}
											/>
											<span>No</span>
										</label>
									</div>
									{errorMessage("is_18_older")}
								</fieldset>

								<fieldset>
									<span className={`${styles.label} ${styles.required}`}>
										School Year
									</span>
									<div className={styles.inlineGroup}>
										{yearOptions.map((opt) => (
											<label key={opt} className={styles.option}>
												<input
													type="radio"
													name="school_year"
													value={opt}
													required={p1}
												/>
												<span>{opt}</span>
											</label>
										))}
									</div>
									{errorMessage("school_year")}
								</fieldset>

								<fieldset>
									<span className={`${styles.label} ${styles.required}`}>
										Dietary Restriction? Select all that apply.
									</span>
									<div className={styles.inlineGroup}>
										{dietaryOptions.map((option) => (
											<label key={option} className={styles.option}>
												<input
													type="checkbox"
													name="dietary_restrictions"
													value={option}
													required={p1 && dietary.length === 0}
													checked={dietary.includes(option)}
													onChange={(e) =>
														handleDietaryChange(option, e.target.checked)
													}
												/>
												<span>{option}</span>
											</label>
										))}
									</div>
									{errorMessage("dietary_restrictions")}
									{isOtherDietarySelected() && (
										<div className={styles.otherField}>
											<label className={styles.field}>
												<span className={`${styles.label} ${styles.required}`}>
													Specify other dietary restrictions
												</span>
												<input
													className={styles.input}
													type="text"
													name="_other_dietary_restrictions"
													required={p1}
												/>
												{errorMessage("_other_dietary_restrictions")}
											</label>
										</div>
									)}
								</fieldset>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Allergies? Please list them.
									</span>
									<input
										className={styles.input}
										type="text"
										name="allergies"
										required={p1}
									/>
									{errorMessage("allergies")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Major?
									</span>
									<select
										className={styles.select}
										name="major"
										required={p1}
										value={major}
										onChange={(event) => {
											setMajor(event.target.value);
											clearError("major");
										}}
									>
										<option value="" disabled>
											Select a major
										</option>
										{majorOptions.map((m) => (
											<option key={m} value={m}>
												{m}
											</option>
										))}
									</select>
									{errorMessage("major")}
								</label>
								{major === "Other" && (
									<label className={styles.field}>
										<span className={`${styles.label} ${styles.required}`}>
											Specify other major
										</span>
										<input
											className={styles.input}
											type="text"
											name="_other_major"
											required={p1}
										/>
										{errorMessage("_other_major")}
									</label>
								)}

								<fieldset>
									<span className={`${styles.label} ${styles.required}`}>
										Have you ever been to a hackathon?
									</span>
									<div className={styles.inlineGroup}>
										<label className={styles.option}>
											<input
												type="radio"
												name="hackathon_experience"
												value="first_time"
												required={p1}
											/>
											<span>No, this is my first time.</span>
										</label>
										<label className={styles.option}>
											<input
												type="radio"
												name="hackathon_experience"
												value="some_experience"
												required={p1}
											/>
											<span>
												Yes, I have been to one/a few, but I am relatively new
												to the concept.
											</span>
										</label>
										<label className={styles.option}>
											<input
												type="radio"
												name="hackathon_experience"
												value="veteran"
												required={p1}
											/>
											<span>Yes, I am a hackathon veteran.</span>
										</label>
									</div>
									{errorMessage("hackathon_experience")}
								</fieldset>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Resume upload
									</span>
									<input
										className={styles.input}
										type="file"
										name="resume"
										accept="application/pdf,.pdf"
										required={p1}
									/>
									{errorMessage("resume")}
								</label>

								<div className={styles.formActions}>
									<PrimaryButton type="button" onClick={handleContinue}>
										Continue
									</PrimaryButton>
								</div>
							</div>
						</div>

						{/* ── Page 2 ── */}
						<div
							className={p1 ? styles.hidden : undefined}
							onInvalidCapture={handleInvalid}
							onChangeCapture={handleFormChange}
							onInputCapture={handleFormChange}
						>
							<div className={styles.applicationContainer}>
								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Tell us about a time when collaboration was instrumental in
										your success. [Max 100 words]
									</span>
									<textarea
										className={styles.textarea}
										name="collaboration_saq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.collaboration_saq >
											wordLimits.collaboration_saq
												? styles.error
												: ""
										}`}
									>
										{wordCounts.collaboration_saq}/
										{wordLimits.collaboration_saq} words
									</span>
									{errorMessage("collaboration_saq")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Describe an application or technological concept that
										inspires your growth. Why is it important to you? (Ex:
										Robots in surgery, quantum computing, social media, etc.)
										[Max 100 words]
									</span>
									<textarea
										className={styles.textarea}
										name="tech_inspiration_saq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.tech_inspiration_saq >
											wordLimits.tech_inspiration_saq
												? styles.error
												: ""
										}`}
									>
										{wordCounts.tech_inspiration_saq}/
										{wordLimits.tech_inspiration_saq} words
									</span>
									{errorMessage("tech_inspiration_saq")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										If you could give each person at UCI one item under $100,
										what would it be and why? [Max 75 words]
									</span>
									<textarea
										className={styles.textarea}
										name="uci_gift_saq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.uci_gift_saq > wordLimits.uci_gift_saq
												? styles.error
												: ""
										}`}
									>
										{wordCounts.uci_gift_saq}/{wordLimits.uci_gift_saq} words
									</span>
									{errorMessage("uci_gift_saq")}
								</label>

								{/* TODO: Implement Last Question */}

								<label className={styles.field}>
									<span className={styles.label}>
										Questions, comments, or concerns?
									</span>
									<textarea className={styles.textarea} name="comments" />
								</label>

								<div className={styles.formActions}>
									<PrimaryButton type="button" onClick={() => setPage(1)}>
										Back
									</PrimaryButton>
								</div>
							</div>
						</div>
					</BaseForm>
				</RetroWindow>
			</div>
		</div>
	);
}
