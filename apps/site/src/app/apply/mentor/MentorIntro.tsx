"use client";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import MentorScrollArea from "./MentorScrollArea";

import styles from "./MentorIntro.module.scss";

interface MentorIntroProps {
	onBack: () => void;
	onContinue: () => void;
}

export default function MentorIntro({ onBack, onContinue }: MentorIntroProps) {
	return (
		<div className={styles.introPage}>
			<div className={styles.backRow}>
				<PrimaryButton
					type="button"
					color="green"
					className={styles.backButton}
					variant="small"
					onClick={onBack}
				>
					Back
				</PrimaryButton>
			</div>

			<div className={styles.windowWrapper}>
				<RetroWindow title="Mentor Intro" closeHref="/apply/mentor">
					<section className={styles.content}>
						<MentorScrollArea>
							<div className={styles.copy}>
								<p>
									Hello! Thank you for your interest in becoming a Mentor at
									ZotHacks 2026! Your support is vital to helping us promote,
									educate, and enhance UCI&apos;s community by giving students
									the platform to learn and create technology. Although Hack@UCI
									is affiliated with UC Irvine, you do not need to be a
									currently enrolled UC Irvine student to apply as a Mentor.
									Mentor applications for ZotHacks are open to everyone.
								</p>

								<h2>Qualifications:</h2>
								<ul>
									<li>
										Previous experience in full stack development (projects,
										internships, hackathons)
									</li>
									<li>
										Strong interest in mentoring beginner hackers navigate
										hackathon and full stack project
									</li>
								</ul>

								<h2>What You&apos;ll Do:</h2>
								<ul>
									<li>
										Mentor a team of 4 at a beginner-oriented hackathon (ideate
										their project, provide feedback on their code, and answer
										questions they have)
									</li>
									<li>
										NOTE: Although you serve as a guiding point for the
										participants, you may not code or do any part of their
										project for the team members yourself.
									</li>
								</ul>

								<h2>What You&apos;ll Gain:</h2>
								<ul>
									<li>Mentoring experience</li>
									<li>
										Food (Saturday breakfast, lunch, dinner, Sunday breakfast)
										and swag will be provided!
									</li>
									<li>
										Upon completion of ZotHacks mentoring, you will receive a
										guaranteed hacker spot at IrvineHacks 2027!
									</li>
								</ul>

								<h2>Tentative Schedule:</h2>
								<ul>
									<li>
										Friday, Oct. 16 7pm - 10pm: pre-hackathon workshops, team
										formation and socials, project ideation, and answering
										questions to your group
									</li>
									<li>
										Saturday, Oct. 17 8am - 10pm: opening ceremony and the
										12-hour hackathon!
									</li>
									<li>
										Sunday, Oct. 18 9am - 1pm (Optional): judging expo, awards
										and recognition, closing ceremony
									</li>
								</ul>

								<p>
									<strong>Location:</strong> UC Irvine Donald Bren Hall (3054
									Donald Bren Hall, Irvine, CA 92697-3435).
								</p>
								<p>
									<strong>Application Deadline:</strong> Friday, October 2, 2026
								</p>

								<PrimaryButton
									type="button"
									className={styles.continueButton}
									onClick={onContinue}
									variant="small"
								>
									Continue
								</PrimaryButton>
							</div>
						</MentorScrollArea>
					</section>
				</RetroWindow>
			</div>
		</div>
	);
}
