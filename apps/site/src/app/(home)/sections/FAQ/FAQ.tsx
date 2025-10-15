import Container from "react-bootstrap/Container";
import { PortableText } from "@portabletext/react";

import { getQuestions } from "./getQuestions";
import FAQAccordion from "./FAQAccordion";

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
			<Container as="div" className="m-0">
				<div className={styles["header-section"]}>
					<h2 className={styles["faq-header"]}>Frequently Asked Questions</h2>

					<p className={styles["faq-subtitle"]}>
						If you don&apos;t find what you&apos;re looking for, reach out to
						our team at{" "}
						<a
							className={styles["purple-text"]}
							href="mailto:contact@zothacks.com"
						>
							contact@zothacks.com
						</a>
					</p>
				</div>
				<FAQAccordion faq={faq} />
			</Container>
		</section>
	);
};

export default FAQ;
