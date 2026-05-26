"use client";

import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

import selectButton from "@/assets/icons/select_button.svg";
import selectedButton from "@/assets/icons/selected_button.svg";

import type { FAQItem } from "./getQuestions";

import styles from "./FAQ.module.scss";

interface FAQAccordionProps {
	faqs: FAQItem[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
	const [activeKey, setActiveKey] = useState<string | null>(
		faqs[0]?._key ?? null,
	);

	return (
		<Accordion
			className={styles.accordion}
			activeKey={activeKey}
			onSelect={(key) => setActiveKey(typeof key === "string" ? key : null)}
		>
			{faqs.map(({ _key, question, answer }) => (
				<Accordion.Item
					key={_key}
					eventKey={_key}
					className={styles.accordionItem}
				>
					<Accordion.Header as="h3" className={styles.questionHeader}>
						<span className={styles.questionIcon} aria-hidden>
							<Image
								src={activeKey === _key ? selectedButton : selectButton}
								alt=""
								width={23}
								height={23}
							/>
						</span>
						<span className={styles.questionText}>{question}</span>
					</Accordion.Header>
					<Accordion.Body className={styles.answerBody}>
						<PortableText
							value={answer}
							components={{
								marks: {
									link: ({ value, children }) => (
										<a
											href={value?.href}
											target="_blank"
											rel="noopener noreferrer"
										>
											{children}
										</a>
									),
								},
							}}
						/>
					</Accordion.Body>
				</Accordion.Item>
			))}
		</Accordion>
	);
};

export default FAQAccordion;
