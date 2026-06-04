"use client";

import { useState } from "react";

import RetroButton from "@/components/RetroButton/RetroButton";
import styles from "./ApplicationForm.module.scss";

const pronounOptions = ["He/Him", "She/Her", "They/Them", "Other"];
const dietaryOptions = [
	"None",
	"No Pork",
	"No Beef",
	"Vegetarian",
	"Vegan",
	"Other",
];
const yearOptions = [
	"1st Year",
	"2nd Year",
	"3rd Year",
	"4th Year",
	"5th Year",
];

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

	const p1 = page === 1;

	function handleDietaryChange(option: string, checked: boolean) {
		setDietary((prev) =>
			checked
				? prev.includes(option)
					? prev
					: [...prev, option]
				: prev.filter((v) => v !== option),
		);
	}

	function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
		const form = e.currentTarget.closest("form");
		if (form && !form.checkValidity()) {
			form.reportValidity();
			return;
		}
		onPageChange(2);
	}

	return (
		<>
			{/* ── Page 1 ── */}
			<div className={p1 ? undefined : styles.hidden}>
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
										onChange={() => setPronouns(option)}
									/>
									<span>{option}</span>
								</label>
							))}
						</div>
						{pronouns === "Other" && (
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
						{dietary.includes("Other") && (
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
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>Major?</span>
						<input
							className={styles.input}
							type="text"
							name="major"
							required={p1}
						/>
					</label>

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
								<span>No, this is my first hackathon!</span>
							</label>
							<label className={styles.option}>
								<input
									type="radio"
									name="hackathon_experience"
									value="some_experience"
									required={p1}
								/>
								<span>Yes, but I&apos;m relatively new to the concept.</span>
							</label>
							<label className={styles.option}>
								<input
									type="radio"
									name="hackathon_experience"
									value="veteran"
									required={p1}
								/>
								<span>Yes, I&apos;ve been to several hackathons.</span>
							</label>
						</div>
					</fieldset>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Please upload a link to your resume. (Ex. A PDF link from Google
							Drive)
						</span>
						<input
							className={styles.input}
							type="url"
							name="resume"
							required={p1}
							placeholder="https://"
						/>
					</label>

					<div className={styles.formActions}>
						<RetroButton type="button" onClick={handleContinue}>
							Continue
						</RetroButton>
					</div>
				</div>
			</div>

			{/* ── Page 2 ── */}
			<div className={p1 ? styles.hidden : undefined}>
				<div className={styles.applicationContainer}>
					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Tell us about a time when collaboration was instrumental in your
							success. [Max 100 words]
						</span>
						<textarea
							className={styles.textarea}
							name="collaboration_saq"
							required={!p1}
						/>
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							Describe an application or technological concept that inspires
							your growth. Why is it important to you? (Ex: Robots in surgery,
							quantum computing, social media, etc.) [Max 100 words]
						</span>
						<textarea
							className={styles.textarea}
							name="tech_inspiration_saq"
							required={!p1}
						/>
					</label>

					<label className={styles.field}>
						<span className={`${styles.label} ${styles.required}`}>
							If you could give each person at UCI one item under $100, what
							would it be and why? [Max 75 words]
						</span>
						<textarea
							className={styles.textarea}
							name="uci_gift_saq"
							required={!p1}
						/>
					</label>

					<label className={styles.field}>
						<span className={styles.label}>
							Pick five emojis to tell a story that represents a time in your
							life you used creativity to solve a problem.
						</span>
						<span className={styles.helper}>_____ _____ _____ _____ _____</span>
						<input className={styles.input} type="text" name="emoji_story" />
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
