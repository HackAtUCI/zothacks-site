import { getQuestions } from "./getQuestions";
import FAQAccordion from "./FAQAccordion";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import styles from "./FAQ.module.scss";

const FAQ = async () => {
	const questions = await getQuestions();
	const faq = questions[0]["faqs"].map(({ _key, question, answer }) => ({
		_key: _key,
		question: <strong>{question}</strong>,
		answer: <PortableText value={answer} />,
	}));

	return (
		<section className={styles.container}>
			<div className={styles.faq}>
				<div
					className={`${styles["accordion-border"]} ${styles["answer-body"]} ${styles["header-body"]}`}
				>
					<h4>
						<span className={styles["light-blue-text"]}>FAQ!</span> Here's answers to our
						most commonly asked questions!
					</h4>
					<p>
						If you don't find what you're looking for, reach out to our team at{" "}
						<a className={styles["purple-text"]} href="mailto:hackatuci@uci.edu">
							hackatuci@uci.edu
						</a>
					</p>
				</div>
				<FAQAccordion faq={faq} />
			</div>
		</section>
	);
};

export default FAQ;
