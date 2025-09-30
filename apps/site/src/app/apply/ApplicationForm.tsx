"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.scss";
import PixelArt from "./PixelArt";

const pronounOptions = ["He/Him", "She/Her", "They/Them/Theirs", "Other"];
const dietaryOptions = [
	"None",
	"No beef",
	"No pork",
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

function BasicQuestions() {
	const [pronouns, setPronouns] = useState<string>("");
	const [dietary, setDietary] = useState<string[]>([]);

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
				<span className={styles.label}>Preferred Pronouns*</span>
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
				<span className={styles.label}>
					You must be 18 years or older to participate in ZotHacks. Will you
					meet this requirement by November 7th 2025?*
				</span>
				<div className={styles.inlineGroup}>
					<label className={styles.option}>
						<input type="radio" name="is_18_older" value="Yes" required />
						<span>Yes</span>
					</label>
					<label className={styles.option}>
						<input type="radio" name="is_18_older" value="No" required />
						<span>No</span>
					</label>
				</div>
			</fieldset>

			<fieldset>
				<span className={styles.label}>School Year*</span>
				<div className={styles.inlineGroup}>
					{yearOptions.map((opt) => (
						<label key={opt} className={styles.option}>
							<input type="radio" name="school_year" value={opt} required />
							<span>{opt}</span>
						</label>
					))}
				</div>
			</fieldset>

			<fieldset>
				<span className={styles.label}>
					Dietary Restrictions. Select all that apply*
				</span>
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
				<span className={styles.label}>Allergies? (Please list)*</span>
				<input className={styles.input} type="text" name="allergies" required />
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Major*</span>
				<input className={styles.input} type="text" name="major" required />
			</label>

			<fieldset>
				<span className={styles.label}>
					Have you ever been to a hackathon?*
				</span>
				<div className={styles.inlineGroup}>
					<label className={styles.option}>
						<input
							type="radio"
							name="hackathon_experience"
							value="first_time"
							required
						/>
						<span>No, this is my first time!</span>
					</label>
					<label className={styles.option}>
						<input
							type="radio"
							name="hackathon_experience"
							value="some_experience"
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
							value="veteran"
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

function SAQSection() {
	return (
		<div className={styles.applicationContainer}>
			<label className={styles.field}>
				<span className={styles.label}>
					If you had 30 seconds in an elevator with your dream mentor, how would
					you explain why you’re joining ZotHacks? [75 word limit]*
				</span>
				<textarea
					className={styles.textarea}
					name="elevator_pitch_saq"
					required
				/>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>
					Describe a positive or negative experience dealing with technology
					[100 words]*
				</span>
				<span className={styles.helper}>
					(Ex: CS project, robot, design, doomscrolling, toaster)
				</span>
				<textarea
					className={styles.textarea}
					name="tech_experience_saq"
					required
				/>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>
					What’s one thing you hope to learn about yourself at UCI — and how
					might ZotHacks help with that? [100 words]*
				</span>
				<textarea
					className={styles.textarea}
					name="learn_about_self_saq"
					required
				/>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>
					Pixel art: Draw something that represents you and paste the output.
					Briefly explain your choice. [100 words]*
				</span>
				<PixelArt />
				<textarea className={styles.textarea} name="q_pixel_art" required />
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Questions, comments, or concerns?</span>
				<textarea className={styles.textarea} name="comments" />
			</label>
		</div>
	);
}

export default function ApplicationForm() {
	return (
		<>
			<BasicQuestions />
			<SAQSection />
		</>
	);
}
