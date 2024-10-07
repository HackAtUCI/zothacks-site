import Container from "react-bootstrap/Container";
import { PortableText } from "@portabletext/react";

import { getQuestions } from "./getQuestions";
import FAQAccordion from "./FAQAccordion";

import styles from "./FAQ.module.scss";

import leftAnteater from "@/assets/images/left-faq-anteater.svg";
import rightAnteater from "@/assets/images/right-faq-anteater.svg";
import AnteaterFloatie from "./AnteaterFloatie";

const FAQ = async () => {
	const questions = await getQuestions();
	const faq = questions[0]["faqs"].map(({ _key, question, answer }) => ({
		_key: _key,
		question: <strong>{question}</strong>,
		answer: <PortableText value={answer} />,
	}));

	return (
		<section className={styles.container}>
			<AnteaterFloatie
				src={leftAnteater}
				alt="left anteater on floatie"
				className={styles["left-anteater"]}
			/>

			<Container as="div" className="m-0">
				<div
					className={`${styles["accordion-border"]} ${styles["answer-body"]} ${styles["header-body"]}`}
				>
					<span className="h4">
						<h2 className="visually-hidden">FAQ</h2>
						<span className={styles["light-blue-text"]}>FAQ!</span> Here's
						answers to our most commonly asked questions!
					</span>

					<p>
						If you don't find what you're looking for, reach out to our team at{" "}
						<a
							className={styles["purple-text"]}
							href="mailto:hack@uci.edu"
						>
							hack@uci.edu
						</a>
					</p>
				</div>
				<FAQAccordion faq={faq} />
			</Container>

			<AnteaterFloatie
				src={rightAnteater}
				alt="left anteater on floatie"
				className={styles["right-anteater"]}
			/>
		</section>
	);
};

export default FAQ;
