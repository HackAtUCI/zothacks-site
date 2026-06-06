"use client";

import {
	useState,
	type FormEvent,
	type InvalidEvent,
	type MouseEvent,
} from "react";

import RetroButton from "@/components/RetroButton/RetroButton";
import styles from "./ApplicationForm.module.scss";

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

interface ApplicationFormProps {
	page: 1 | 2;
	onPageChange: (page: 1 | 2) => void;
}

export default function ApplicationForm({
	page,
	onPageChange,
}: ApplicationFormProps) {
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

	function isOtherPronounsSelected() {
		return pronouns.toLowerCase() === "other";
	}

	function isOtherDietarySelected() {
		return dietary.includes("Other") || dietary.includes("Other (Please specify)");
	}

	function handleContinue(e: MouseEvent<HTMLButtonElement>) {
		const form = e.currentTarget.closest("form");
		if (form) {
			const visibleFields = Array.from(form.elements).filter(
				(element): element is FieldElement =>
					(element instanceof HTMLInputElement ||
						element instanceof HTMLSelectElement ||
						element instanceof HTMLTextAreaElement) &&
					element.offsetParent !== null,
			);
			const firstInvalid = visibleFields.find(
				(field) => !field.checkValidity(),
			);

			if (firstInvalid) {
				firstInvalid.reportValidity();
				return;
			}
		}
		onPageChange(2);
	}

	return (
		<>
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
								className={`${styles.input} ${
									validationErrors.first_name ? styles.invalid : ""
								}`}
								type="text"
								name="first_name"
								required={p1}
								aria-invalid={Boolean(validationErrors.first_name)}
								aria-describedby={
									validationErrors.first_name ? "first_name-error" : undefined
								}
							/>
							{validationErrors.first_name && (
								<span id="first_name-error" className={styles.error}>
									{validationErrors.first_name}
								</span>
							)}
						</label>
						<label className={styles.field}>
							<span className={`${styles.label} ${styles.required}`}>
								Last Name
							</span>
							<input
								className={`${styles.input} ${
									validationErrors.last_name ? styles.invalid : ""
								}`}
								type="text"
								name="last_name"
								required={p1}
								aria-invalid={Boolean(validationErrors.last_name)}
								aria-describedby={
									validationErrors.last_name ? "last_name-error" : undefined
								}
							/>
							{validationErrors.last_name && (
								<span id="last_name-error" className={styles.error}>
									{validationErrors.last_name}
								</span>
							)}
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
						{validationErrors.pronouns && (
							<span className={styles.error}>{validationErrors.pronouns}</span>
						)}
						{isOtherPronounsSelected() && (
							<div className={styles.otherField}>
								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Specify other pronouns
									</span>
									<input
										className={`${styles.input} ${
											validationErrors._other_pronouns ? styles.invalid : ""
										}`}
										type="text"
										name="_other_pronouns"
										required={p1}
										aria-invalid={Boolean(validationErrors._other_pronouns)}
									/>
									{validationErrors._other_pronouns && (
										<span className={styles.error}>
											{validationErrors._other_pronouns}
										</span>
									)}
								</label>
							</div>
						)}
					</fieldset>

					<fieldset>
						<span className={`${styles.label} ${styles.required}`}>
							You must be 18 years or older to participate in ZotHacks. Will you
							meet this requirement by October 16 2026?
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
						{validationErrors.is_18_older && (
							<span className={styles.error}>
								{validationErrors.is_18_older}
							</span>
						)}
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
						{validationErrors.school_year && (
							<span className={styles.error}>
								{validationErrors.school_year}
							</span>
						)}
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
						{validationErrors.dietary_restrictions && (
							<span className={styles.error}>
								{validationErrors.dietary_restrictions}
							</span>
						)}
						{isOtherDietarySelected() && (
							<div className={styles.otherField}>
								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Specify other dietary restrictions
									</span>
									<input
										className={`${styles.input} ${
											validationErrors._other_dietary_restrictions
												? styles.invalid
												: ""
										}`}
										type="text"
										name="_other_dietary_restrictions"
										required={p1}
										aria-invalid={Boolean(
											validationErrors._other_dietary_restrictions,
										)}
									/>
									{validationErrors._other_dietary_restrictions && (
										<span className={styles.error}>
											{validationErrors._other_dietary_restrictions}
										</span>
									)}
								</label>
							</div>
						)}
					</fieldset>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Allergies? Please list them.
						</span>
						<input
							className={`${styles.input} ${
								validationErrors.allergies ? styles.invalid : ""
							}`}
							type="text"
							name="allergies"
							required={p1}
							aria-invalid={Boolean(validationErrors.allergies)}
						/>
						{validationErrors.allergies && (
							<span className={styles.error}>{validationErrors.allergies}</span>
						)}
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>Major?</span>
						<select
							className={`${styles.select} ${
								validationErrors.major ? styles.invalid : ""
							}`}
							name="major"
							required={p1}
							value={major}
							onChange={(event) => {
								setMajor(event.target.value);
								clearError("major");
							}}
							aria-invalid={Boolean(validationErrors.major)}
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
						{validationErrors.major && (
							<span className={styles.error}>{validationErrors.major}</span>
						)}
					</label>
					{major === "Other" && (
						<label className={styles.field}>
							<span className={`${styles.label} ${styles.required}`}>
								Specify other major
							</span>
							<input
								className={`${styles.input} ${
									validationErrors._other_major ? styles.invalid : ""
								}`}
								type="text"
								name="_other_major"
								required={p1}
								aria-invalid={Boolean(validationErrors._other_major)}
							/>
							{validationErrors._other_major && (
								<span className={styles.error}>
									{validationErrors._other_major}
								</span>
							)}
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
									Yes, I have been to one/a few, but I am relatively new to the
									concept.
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
						{validationErrors.hackathon_experience && (
							<span className={styles.error}>
								{validationErrors.hackathon_experience}
							</span>
						)}
					</fieldset>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Resume link upload - pdf link from google drive
						</span>
						<input
							className={`${styles.input} ${
								validationErrors.resume ? styles.invalid : ""
							}`}
							type="url"
							name="resume"
							required={p1}
							placeholder="https://"
							aria-invalid={Boolean(validationErrors.resume)}
						/>
						{validationErrors.resume && (
							<span className={styles.error}>{validationErrors.resume}</span>
						)}
					</label>

					<div className={styles.formActions}>
						<RetroButton type="button" onClick={handleContinue}>
							Continue
						</RetroButton>
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
							Tell us about a time when collaboration was instrumental in your
							success. [Max 100 words]
						</span>
						<textarea
							className={`${styles.textarea} ${
								validationErrors.collaboration_saq ? styles.invalid : ""
							}`}
							name="collaboration_saq"
							required={!p1}
							aria-invalid={Boolean(validationErrors.collaboration_saq)}
						/>
						<span
							className={`${styles.helper} ${
								wordCounts.collaboration_saq > wordLimits.collaboration_saq
									? styles.error
									: ""
							}`}
						>
							{wordCounts.collaboration_saq}/{wordLimits.collaboration_saq}{" "}
							words
						</span>
						{validationErrors.collaboration_saq && (
							<span className={styles.error}>
								{validationErrors.collaboration_saq}
							</span>
						)}
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Describe an application or technological concept that inspires
							your growth. Why is it important to you? (Ex: Robots in surgery,
							quantum computing, social media, etc.) [Max 100 words]
						</span>
						<textarea
							className={`${styles.textarea} ${
								validationErrors.tech_inspiration_saq ? styles.invalid : ""
							}`}
							name="tech_inspiration_saq"
							required={!p1}
							aria-invalid={Boolean(validationErrors.tech_inspiration_saq)}
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
						{validationErrors.tech_inspiration_saq && (
							<span className={styles.error}>
								{validationErrors.tech_inspiration_saq}
							</span>
						)}
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							If you could give each person at UCI one item under $100, what
							would it be and why? [Max 75 words]
						</span>
						<textarea
							className={`${styles.textarea} ${
								validationErrors.uci_gift_saq ? styles.invalid : ""
							}`}
							name="uci_gift_saq"
							required={!p1}
							aria-invalid={Boolean(validationErrors.uci_gift_saq)}
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
						{validationErrors.uci_gift_saq && (
							<span className={styles.error}>
								{validationErrors.uci_gift_saq}
							</span>
						)}
					</label>

					{/* TODO - replace with actual question */}
					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Pick five emojis to tell a story that represents a time in your
							life you used creativity to solve a problem.
						</span>
						<span className={styles.helper}>_____ _____ _____ _____ _____</span>
						<input
							className={`${styles.input} ${
								validationErrors.emoji_story ? styles.invalid : ""
							}`}
							type="text"
							name="emoji_story"
							required={!p1}
							aria-invalid={Boolean(validationErrors.emoji_story)}
						/>
						{validationErrors.emoji_story && (
							<span className={styles.error}>
								{validationErrors.emoji_story}
							</span>
						)}
					</label>

					<label className={styles.field}>
						<span className={styles.label}>
							Questions, comments, or concerns?
						</span>
						<textarea className={styles.textarea} name="comments" />
					</label>

					<div className={styles.formActions}>
						<RetroButton type="button" onClick={() => onPageChange(1)}>
							Back
						</RetroButton>
					</div>
				</div>
			</div>
		</>
	);
}
