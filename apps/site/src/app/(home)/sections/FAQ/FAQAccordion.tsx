"use client";

import Accordion from "react-bootstrap/Accordion";
import styles from "./FAQ.module.scss";
import { AccordionButton } from "react-bootstrap";

interface FAQAccordion {
	faq: {
		_key: string;
		question: JSX.Element;
		answer: JSX.Element;
	}[];
}

const FAQAccordion: React.FC<FAQAccordion> = ({ faq }) => {
	return (
		<Accordion className={styles.accordion} alwaysOpen>
			{faq.map(({ _key, question, answer }) => (
				<Accordion.Item
					key={_key}
					className={styles["accordion-border"]}
					eventKey={_key}
				>
					<Accordion.Header as="h3" className={styles["question-body"]}>
						{question}
						{/* <AccordionButton /> */}
					</Accordion.Header>
					<Accordion.Body className={styles["answer-body"]}>
						{answer}
					</Accordion.Body>
				</Accordion.Item>
			))}
		</Accordion>
	);
};

export default FAQAccordion;
