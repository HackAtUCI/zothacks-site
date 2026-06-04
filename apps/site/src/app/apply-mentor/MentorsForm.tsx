"use client";

import { useState } from "react";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import BaseForm from "@/components/BaseForm/BaseForm";
import RetroButton from "@/components/RetroButton/RetroButton";

import styles from "./MentorsForm.module.scss";

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
const majorOptions = [
	"Business Information Management",
	"Computer Game Science",
	"Computer Science",
	"Computer Science and Engineering",
	"Data Science",
	"Electrical Engineering",
	"Informatics",
	"Software Engineering",
	"Undeclared",
	"Other",
];

const SKILLS: Record<string, string[]> = {
	Languages: ["Python", "Java", "C++", "Javascript", "Netlify"],
	Frontend: ["HTML/CSS", "React", "Next.js", "C#", "GitHub Pages"],
	"Backend / Tools": ["Git", "SQL", "AWS", "Vercel", "Other"],
};

function skillKey(skill: string) {
	return `skill_${skill.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export default function MentorsForm() {
	const [page, setPage] = useState<1 | 2>(1);
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
		setPage(2);
	}

	const title = p1 ? "Mentor Application" : "Mentor Application (Continued)";

	return (
		<div className={styles.page}>
			<div className={styles.windowWrapper}>
				<RetroWindow title={title}>
					<BaseForm
						applyPath="/api/user/mentor"
						applicationType="Mentor"
						className={styles.form}
						hideSubmit={p1}
					>
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
								</label>

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
									<span className={`${styles.label} ${styles.required}`}>
										What is your current academic status?
									</span>
									<input
										className={styles.input}
										type="text"
										name="academic_status"
										required={p1}
									/>
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
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Please upload a file to your resume.
									</span>
									<input
										className={styles.input}
										type="file"
										name="resume"
										accept="application/pdf,.pdf"
										required={p1}
									/>
								</label>

								<label className={styles.field}>
									<span className={styles.label}>LinkedIn profile link</span>
									<input
										className={styles.input}
										type="url"
										name="linkedin"
										placeholder="https://"
									/>
								</label>

								<label className={styles.field}>
									<span className={styles.label}>GitHub profile link</span>
									<input
										className={styles.input}
										type="url"
										name="github"
										placeholder="https://"
									/>
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
										What tech stack experience do you have? [Any combo of front
										end + backend (e.g. MERN, Django, AWS +
										React/Vue.js/Angular)]
									</span>
									<textarea
										className={styles.textarea}
										name="tech_stack_frq"
										required={!p1}
									/>
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										*3-4 sentences minimum* Given the stack that you mentioned,
										how do you usually go about connecting the front end with
										the back end?
									</span>
									<textarea
										className={styles.textarea}
										name="frontend_backend_frq"
										required={!p1}
									/>
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
								</label>

								<div className={styles.skillsSection}>
									<span className={`${styles.skillsLabel} ${styles.required}`}>
										Technical skills + Experience Level (1: unfamiliar — 5:
										proficient)
									</span>
									<div className={styles.skillsGrid}>
										{Object.entries(SKILLS).map(([category, skillList]) => (
											<div key={category} className={styles.skillsColumn}>
												<div className={styles.skillsColumnTitle}>
													{category}
												</div>
												{skillList.map((skill) => (
													<div key={skill} className={styles.skillRow}>
														<span className={styles.skillName}>{skill}</span>
														<select
															className={styles.skillSelect}
															name={skillKey(skill)}
															required={!p1}
															defaultValue=""
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
													</div>
												))}
											</div>
										))}
									</div>
								</div>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										Tell us about a time you taught someone a subject that they
										had limited knowledge of.
									</span>
									<textarea
										className={styles.textarea}
										name="teaching_experience_frq"
										required={!p1}
									/>
								</label>

								<label className={styles.field}>
									<span className={`${styles.label} ${styles.required}`}>
										If your team had different working styles and experience
										levels, how would you lead them effectively while keeping
										everyone engaged?
									</span>
									<textarea
										className={styles.textarea}
										name="team_leadership_frq"
										required={!p1}
									/>
								</label>

								<label className={styles.field}>
									<span className={styles.label}>
										Questions, comments, or concerns?
									</span>
									<textarea className={styles.textarea} name="comments" />
								</label>

								<div className={styles.formActions}>
									<RetroButton type="button" onClick={() => setPage(1)}>
										Back
									</RetroButton>
								</div>
							</div>
						</div>
					</BaseForm>
				</RetroWindow>
			</div>
		</div>
	);
}
