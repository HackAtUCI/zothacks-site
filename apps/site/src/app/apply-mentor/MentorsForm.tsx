import styles from "./MentorsForm.module.scss";

export default async function MentorsForm () {
    return (
        <div className={styles.formWrapper}>
            <p>
                Please fill out the following form, and we'll get back to you soon with
                your application status.
            </p>

            <form action="apply-mentor/submitted" method="post" className={styles.mentorForm}>
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />
                <input type="email" name="email" placeholder="Email Address" required />

                <fieldset className={styles.radioGroup}>
                    <legend>Are you 18 years or older?</legend>
                    <label>
                        <input type="radio" name="age" value="yes" /> Yes
                    </label>
                    <label>
                        <input type="radio" name="age" value="no" /> No
                    </label>
                </fieldset>

                <input
                    type="text"
                    name="pronouns"
                    placeholder="Preferred Pronouns"
                />
                <input type="text" name="degree" placeholder="Degree" />
                <input type="text" name="major" placeholder="Major" />
                <input
                    type="text"
                    name="gradYear"
                    placeholder="Expected Grad Year"
                />

                <input
                    type="text"
                    name="mentoringExp"
                    placeholder="Have you mentored a hackathon before? If so, list which ones..."
                />

                <div className={styles.textareaGroup}>
                    <label className={styles.textareaLabel}>
                        How would you help participants turn an ambitious idea into something achievable within the hackathon?
                    </label>
                    <textarea name="helpParticipants" />
                </div>

                <div className={styles.textareaGroup}>
                    <label className={styles.textareaLabel}>
                        If your team were completely new to web development, what steps would you take to make their learning palatable?
                    </label>
                    <textarea name="newTeamHelp" />
                </div>

                <input
                    type="text"
                    name="techStack"
                    placeholder="What tech stack experience do you have?"
                />

                <div className={styles.textareaGroup}>
                    <label className={styles.textareaLabel}>
                        Given the stack that you mentioned, how do you usually go about connecting
                        the front end with the back end? Answer in at least 2-3 sentences.
                    </label>
                    <textarea name="frontendBackend" />
                </div>

                <fieldset className={styles.checkboxGroup}>
                    <legend>Select any technical skills you have:</legend>
                    <label><input type="checkbox" name="skills" value="Python" /> Python</label>
                    <label><input type="checkbox" name="skills" value="Java" /> Java</label>
                    <label><input type="checkbox" name="skills" value="C++" /> C++</label>
                    <label><input type="checkbox" name="skills" value="JavaScript" /> JavaScript</label>
                    <label><input type="checkbox" name="skills" value="HTML/CSS" /> HTML/CSS</label>
                    <label><input type="checkbox" name="skills" value="React" /> React</label>
                    <label><input type="checkbox" name="skills" value="Next.js" /> Next.js</label>
                    <label><input type="checkbox" name="skills" value="C#" /> C#</label>
                    <label><input type="checkbox" name="skills" value="Git" /> Git</label>
                    <label><input type="checkbox" name="skills" value="SQL" /> SQL (Any variation)</label>
                    <label><input type="checkbox" name="skills" value="AWS Services" /> AWS Services</label>
                    <label><input type="checkbox" name="skills" value="Vercel" /> Vercel</label>
                    <label><input type="checkbox" name="skills" value="Netlify" /> Netlify</label>
                    <label><input type="checkbox" name="skills" value="Github Pages" /> Github Pages</label>
                    <label><input type="checkbox" name="skills" value="Other" /> Other</label>
                </fieldset>

                <input type="url" name="linkedin" placeholder="Linkedin" />
                <input type="url" name="github" placeholder="Github" />
                <input type="url" name="personalWebsite" placeholder="Personal Website" />
                <label className={styles.fileField}>
                    <span className={styles.fileText}>
                        Resume Upload
                    </span>
                    <input
                        type="file"
                        name="resume"
                        id="resume"
                        className={styles.fileInput}
                    />
                    <span className={styles.fileButton}>Choose File</span>
                </label>

                <div className={styles.textareaGroup}>
                    <label className={styles.textareaLabel}>
                        Questions / comments / concerns
                    </label>
                    <textarea name="comments" />
                </div>

                <button type="submit" className={styles.submitButton}>Submit Application</button>
            </form>
        </div>
    )
}
