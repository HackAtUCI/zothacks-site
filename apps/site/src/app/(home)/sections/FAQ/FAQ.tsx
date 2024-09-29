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
				{/* <div className={styles["vertical-line"]} /> */}
				{/* <Image src={star} alt="star" className={styles["star-lg"]} />
				<Image src={star} alt="star" className={styles["star-sm"]} />
				<Image src={eraser} alt="eraser" className={styles["eraser"]} /> */}
				<h2 className={styles.title}>FAQ</h2>
				<FAQAccordion faq={faq} />
			</div>
		</section>
	);
};

export default FAQ;
