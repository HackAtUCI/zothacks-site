"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.scss";

export default function ApplicationForm() {
	const [pronouns, setPronouns] = useState<string>("");
	const [dietary, setDietary] = useState<string[]>([]);

	const pronounOptions = [
		"He/Him",
		"She/Her",
		"They/Them/Theirs",
		"Other",
	] as const;
	const dietaryOptions = [
		"None",
		"No beef",
		"No pork",
		"Vegetarian",
		"Vegan",
		"Other",
	] as const;

	const isPronounsOther = pronouns === "Other";
	const isDietaryOther = dietary.includes("Other");

	function handleDietaryChange(option: string, checked: boolean) {
		setDietary((prev) => {
			if (checked) {
				if (prev.includes(option)) return prev;
				return [...prev, option];
			}
			return prev.filter((v) => v !== option);
		});
	}

	return (
		<div className={styles.applicationContainer}>
			<div className={styles.row}>
				<label className={styles.field}>
					<span className={styles.label}>First Name*</span>
					<input
						className={styles.input}
						type="text"
						name="first_name"
						required
					/>
				</label>
				<label className={styles.field}>
					<span className={styles.label}>Last Name*</span>
					<input
						className={styles.input}
						type="text"
						name="last_name"
						required
					/>
				</label>
			</div>

			<fieldset>
				<legend className={styles.label}>Preferred Pronouns*</legend>
				<div className={styles.inlineGroup}>
					{pronounOptions.map((option) => (
						<label key={option} className={styles.option}>
							<input
								type="radio"
								name="pronouns"
								value={option}
								required
								checked={pronouns === option}
								onChange={() => setPronouns(option)}
							/>
							<span>{option}</span>
						</label>
					))}
				</div>
				{isPronounsOther && (
					<div className={styles.otherField}>
						<label className={styles.field}>
							<span className={styles.label}>Specify other pronouns*</span>
							<input
								className={styles.input}
								type="text"
								name="_other_pronouns"
								required
							/>
						</label>
					</div>
				)}
			</fieldset>

			<fieldset>
				<legend className={styles.label}>
					You must be 18 years or older by Nov 7, 2025*
				</legend>
				<div className={styles.inlineGroup}>
					<label className={styles.option}>
						<input type="radio" name="age_requirement" value="Yes" required />
						<span>Yes</span>
					</label>
					<label className={styles.option}>
						<input type="radio" name="age_requirement" value="No" required />
						<span>No</span>
					</label>
				</div>
			</fieldset>

			<fieldset>
				<legend className={styles.label}>School Year*</legend>
				<div className={styles.inlineGroup}>
					{["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map(
						(opt) => (
							<label key={opt} className={styles.option}>
								<input type="radio" name="school_year" value={opt} required />
								<span>{opt}</span>
							</label>
						),
					)}
				</div>
			</fieldset>

			<fieldset>
				<legend className={styles.label}>
					Dietary Restrictions. Select all that apply*
				</legend>
				<div className={styles.inlineGroup}>
					{dietaryOptions.map((option) => (
						<label key={option} className={styles.option}>
							<input
								type="checkbox"
								name="dietary_restrictions"
								value={option}
								required={dietary.length === 0}
								checked={dietary.includes(option)}
								onChange={(e) => handleDietaryChange(option, e.target.checked)}
							/>
							<span>{option}</span>
						</label>
					))}
				</div>
				{isDietaryOther && (
					<div className={styles.otherField}>
						<label className={styles.field}>
							<span className={styles.label}>
								Specify other dietary restrictions*
							</span>
							<input
								className={styles.input}
								type="text"
								name="_other_dietary_restrictions"
								required
							/>
						</label>
					</div>
				)}
			</fieldset>

			<label className={styles.field}>
				<span className={styles.label}>Allergies? (Please List)*</span>
				<input className={styles.input} type="text" name="allergies" required />
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Major*</span>
				<input className={styles.input} type="text" name="major" required />
			</label>

			<fieldset>
				<legend className={styles.label}>
					Have you ever been to a hackathon?*
				</legend>
				<div className={styles.inlineGroup}>
					<label className={styles.option}>
						<input
							type="radio"
							name="hackathon_experience"
							value="First time"
							required
						/>
						<span>No, this is my first time!</span>
					</label>
					<label className={styles.option}>
						<input
							type="radio"
							name="hackathon_experience"
							value="Some experience"
							required
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
							value="Veteran"
							required
						/>
						<span>Yes, I am a hackathon veteran.</span>
					</label>
				</div>
			</fieldset>

			<label className={styles.field}>
				<span className={styles.label}>
					Please upload a link to your resume*
				</span>
				<span className={styles.helper}>
					Example: a shareable PDF link from Google Drive
				</span>
				<input
					className={styles.input}
					type="url"
					name="resume_link"
					placeholder="https://..."
					required
				/>
			</label>
		</div>
	);
}
