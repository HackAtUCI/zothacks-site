"use client";

import {
	useEffect,
	useState,
	type FormEvent,
	type InvalidEvent,
	type ReactNode,
} from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import BaseForm from "@/components/BaseForm/BaseForm";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./MentorsForm.module.scss";

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
const majorOptions = [
	"Business Information Management",
	"Computer Science",
	"Computer Science and Engineering",
	"Data Science",
	"Game Design and Interactive Media",
	"Electrical Engineering",
	"Informatics",
	"Software Engineering",
	"Undeclared",
	"Other",
];
const academicStatusOptions = [
	"Undergraduate — Graduating 2027",
	"Undergraduate — Graduating 2028",
	"Undergraduate — Graduating 2029",
	"Undergraduate — Graduating 2030",
	"Graduate — Master's (in progress)",
	"Graduate — Doctorate (in progress)",
	"Graduated — Bachelor's",
	"Graduated — Master's",
	"Graduated — Doctorate",
	"Other",
];

const skillGroups = [
	{
		category: "Languages",
		skills: ["Python", "Java", "C++", "JavaScript", "Other"],
	},
	{
		category: "Web Development",
		skills: [
			"HTML/CSS",
			"React.js",
			"Next.js/Vite",
			"FastAPI/Node.js",
			"Other",
		],
	},
	{
		category: "Tools & Platforms",
		skills: [
			"Git",
			"SQL (Any variation)",
			"AWS Services",
			"Vercel/GitHub Pages",
			"Other",
		],
	},
];

const wordLimits = {
	tech_stack_frq: 100,
	teaching_experience_frq: 100,
	team_leadership_frq: 100,
} as const;

function skillKey(skill: string) {
	return `skill_${skill.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

function otherSkillNameKey(category: string) {
	return `other_${category.toLowerCase().replace(/[^a-z0-9]/g, "_")}_name`;
}

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type FormPage = 1 | 2;

function countWords(value: string) {
	return value.trim().split(/\s+/).filter(Boolean).length;
}

function getPageFromUrl(): FormPage {
	const page = new URL(window.location.href).searchParams.get("page");
	return page === "2" ? 2 : 1;
}

function updatePageUrl(nextPage: FormPage) {
	const url = new URL(window.location.href);
	if (nextPage === 1) {
		url.searchParams.delete("page");
	} else {
		url.searchParams.set("page", String(nextPage));
	}

	window.history.pushState(null, "", url);
}

interface MentorsFormProps {
	onBack: () => void;
}

export default function MentorsForm({ onBack }: MentorsFormProps) {
	const [page, setPage] = useState<FormPage>(1);
	const [pronouns, setPronouns] = useState("");
	const [dietary, setDietary] = useState<string[]>([]);
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});
	const [wordCounts, setWordCounts] = useState<Record<string, number>>({
		tech_stack_frq: 0,
		teaching_experience_frq: 0,
		team_leadership_frq: 0,
	});

	const p1 = page === 1;

	useEffect(() => {
		setPage(getPageFromUrl());

		const syncPageFromHistory = () => setPage(getPageFromUrl());
		window.addEventListener("popstate", syncPageFromHistory);

		return () => window.removeEventListener("popstate", syncPageFromHistory);
	}, []);

	function goToPage(nextPage: FormPage) {
		updatePageUrl(nextPage);
		setPage(nextPage);
	}

	function getValidationMessage(field: FieldElement) {
		if (field.validity.valueMissing) {
			if (field.name === "dietary_restrictions") {
				return "Select at least one dietary option.";
			}
			if (field.name.startsWith("skill_")) {
				return "Select an experience level for every skill.";
			}
			if (field.type === "radio") return "Select one option.";
			if (field.tagName === "SELECT") return "Select an option.";
			return "This field is required.";
		}
		if (field.validity.typeMismatch) {
			if (field.name === "email") {
				return "Please input a valid email address.";
			}
			return "Please input a valid URL.";
		}
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
			syncGroupedInputState(field);
			updateFieldValidity(field);
		}
	}

	function errorMessage(name: string): ReactNode {
		if (!validationErrors[name]) return null;
		return <span className={styles.error}>{validationErrors[name]}</span>;
	}

	function skillsError(): ReactNode {
		const error = Object.entries(validationErrors).find(
			([name]) => name.startsWith("skill_") || name.startsWith("other_"),
		)?.[1];

		if (!error) return null;
		return <span className={styles.error}>{error}</span>;
	}

	function clearSkillErrors() {
		setValidationErrors((prev) => {
			const next = { ...prev };
			let changed = false;

			for (const name of Object.keys(next)) {
				if (name.startsWith("skill_") || name.startsWith("other_")) {
					delete next[name];
					changed = true;
				}
			}

			return changed ? next : prev;
		});
	}

	function setPronoun(option: string) {
		setPronouns(option);
		clearError("pronouns");
	}

	function isOtherDietarySelected() {
		return (
			dietary.includes("Other") || dietary.includes("Other (Please specify)")
		);
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

	function syncGroupedInputState(field: FieldElement) {
		if (field.name === "pronouns" && field instanceof HTMLInputElement) {
			if (field.checked) setPronouns(field.value);
		}

		if (field.name === "dietary_restrictions") {
			const form = field.form;
			if (!form) return;

			setDietary(
				Array.from(
					form.querySelectorAll<HTMLInputElement>(
						'input[name="dietary_restrictions"]:checked',
					),
				).map((input) => input.value),
			);
		}
	}

	function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
		const form = e.currentTarget.closest("form");
		if (form && !form.checkValidity()) {
			form.reportValidity();
			return;
		}
		goToPage(2);
	}

	function handleBack() {
		if (page === 2) {
			goToPage(1);
			return;
		}

		onBack();
	}

	const title = p1 ? "Mentor Application" : "Mentor Application (Continued)";

	return (
		<div className={styles.page}>
			<div className={styles.backRow}>
				<PrimaryButton
					type="button"
					color="green"
					className={styles.backButton}
					variant="small"
					onClick={handleBack}
				>
					Back
				</PrimaryButton>
			</div>

			<div className={styles.windowWrapper}>
				<RetroWindow title={title}>
					<BaseForm
						applyPath="/api/user/mentor"
						applicationType="Mentor"
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

								<div className={styles.row}>
									<label className={styles.field}>
										<span className={`${styles.label} ${styles.required}`}>
											Email Address
										</span>
										<input
											className={styles.input}
											type="email"
											name="email"
											required={p1}
										/>
										{errorMessage("email")}
									</label>
									<label className={styles.field}>
										<span className={`${styles.label} ${styles.required}`}>
											Phone Number
										</span>
										<input
											className={styles.input}
											type="tel"
											name="phone_number"
											required={p1}
										/>
										{errorMessage("phone_number")}
									</label>
								</div>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Discord Username (ZotHacks 2026 will be held on Discord.
										Having an account is required to be a Mentor for ZotHacks
										2026.)
									</span>
									<input
										className={styles.input}
										type="text"
										name="discord_username"
										required={p1}
									/>
									{errorMessage("discord_username")}
								</label>

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
													onChange={() => setPronoun(option)}
												/>
												<span>{option}</span>
											</label>
										))}
									</div>
									{errorMessage("pronouns")}
									{pronouns === "other" && (
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
									<span className={styles.label}>
										Allergies? Please list them.
									</span>
									<input
										className={styles.input}
										type="text"
										name="allergies"
									/>
									{errorMessage("allergies")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Area of study / Major?
									</span>
									<select
										className={styles.select}
										name="major"
										required={p1}
										defaultValue=""
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

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										What is your current academic status?
									</span>
									<select
										className={styles.select}
										name="academic_status"
										required={p1}
										defaultValue=""
									>
										<option value="" disabled>
											Select your academic status
										</option>
										{academicStatusOptions.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
									{errorMessage("academic_status")}
								</label>

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

								<label className={styles.field}>
									<span className={styles.label}>LinkedIn profile link</span>
									<input
										className={styles.input}
										type="url"
										name="linkedin"
										placeholder="https://"
									/>
									{errorMessage("linkedin")}
								</label>

								<label className={styles.field}>
									<span className={styles.label}>GitHub profile link</span>
									<input
										className={styles.input}
										type="url"
										name="github"
										placeholder="https://"
									/>
									{errorMessage("github")}
								</label>

								<label className={styles.field}>
									<span className={styles.label}>
										Personal website / portfolio link
									</span>
									<input
										className={styles.input}
										type="url"
										name="portfolio"
										placeholder="https://"
									/>
									{errorMessage("portfolio")}
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
										What tech stack experience do you have? [Any combo of front
										end + backend (e.g. MERN, Django, AWS +
										React/Vue.js/Angular)] [Max 100 words]
									</span>
									<textarea
										className={styles.textarea}
										name="tech_stack_frq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.tech_stack_frq > wordLimits.tech_stack_frq
												? styles.error
												: ""
										}`}
									>
										{`${wordCounts.tech_stack_frq}/${wordLimits.tech_stack_frq} words`}
									</span>
									{errorMessage("tech_stack_frq")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										*3-4 sentences minimum* Given the stack that you mentioned,
										how do you usually go about connecting the front-end with
										the back-end?
									</span>
									<textarea
										className={styles.textarea}
										name="frontend_backend_frq"
										required={!p1}
									/>
									{errorMessage("frontend_backend_frq")}
								</label>

								<div className={styles.skillsSection}>
									<span className={`${styles.label} ${styles.required}`}>
										Technical skills + Experience Level (1: unfamiliar — 5:
										proficient)
									</span>
									<div className={styles.skillsGrid}>
										{skillGroups.map(({ category, skills }) => (
											<div key={category} className={styles.skillsColumn}>
												<div className={styles.skillsColumnTitle}>
													{category}
												</div>
												{skills.map((skill) => {
													const isOther = skill === "Other";
													const otherName = otherSkillNameKey(category);

													return (
														<div key={skill} className={styles.skillRow}>
															{isOther ? (
																<input
																	className={styles.input}
																	type="text"
																	name={otherName}
																	placeholder={
																		category === "Languages"
																			? "Other (ex: Kotlin(4), C#(3))"
																			: category === "Web Development"
																				? "Other (ex: Django(4), Flask(3))"
																				: "Other (ex: Docker(4), Firebase(3))"
																	}
																	onChange={() => clearSkillErrors()}
																/>
															) : (
																<>
																	<span className={styles.skillName}>
																		{skill}
																	</span>
																	<select
																		className={styles.skillSelect}
																		name={skillKey(skill)}
																		required={!p1}
																		defaultValue=""
																		onChange={() => clearSkillErrors()}
																	>
																		<option value="" disabled>
																			—
																		</option>
																		{[1, 2, 3, 4, 5].map((n) => (
																			<option key={n} value={n}>
																				{n}
																			</option>
																		))}
																	</select>
																</>
															)}
														</div>
													);
												})}
											</div>
										))}
									</div>
									{skillsError()}
								</div>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Tell us about a time you taught someone a subject that they
										had limited knowledge of. [Max 100 words]
									</span>
									<textarea
										className={styles.textarea}
										name="teaching_experience_frq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.teaching_experience_frq >
											wordLimits.teaching_experience_frq
												? styles.error
												: ""
										}`}
									>
										{`${wordCounts.teaching_experience_frq}/${wordLimits.teaching_experience_frq} words`}
									</span>
									{errorMessage("teaching_experience_frq")}
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										If your team had different working styles and experience
										levels, how would you lead them effectively while keeping
										everyone engaged? [Max 100 words]
									</span>
									<textarea
										className={styles.textarea}
										name="team_leadership_frq"
										required={!p1}
									/>
									<span
										className={`${styles.helper} ${
											wordCounts.team_leadership_frq >
											wordLimits.team_leadership_frq
												? styles.error
												: ""
										}`}
									>
										{`${wordCounts.team_leadership_frq}/${wordLimits.team_leadership_frq} words`}
									</span>
									{errorMessage("team_leadership_frq")}
								</label>

								<label className={styles.field}>
									<span className={styles.label}>
										Questions, comments, or concerns?
									</span>
									<textarea className={styles.textarea} name="comments" />
								</label>
							</div>
						</div>
					</BaseForm>
				</RetroWindow>
			</div>
		</div>
	);
}
