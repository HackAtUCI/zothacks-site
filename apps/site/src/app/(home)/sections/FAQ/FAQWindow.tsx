"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import slidePeter from "@/assets/images/slide_peter.svg";

import FAQAccordion from "./FAQAccordion";
import FAQCategoryNav from "./FAQCategoryNav";
import { FAQCategory } from "./faqCategories";
import type { FAQItem } from "./getQuestions";

import styles from "./FAQ.module.scss";

interface FAQWindowProps {
	faqs: FAQItem[];
}

const FAQWindow = ({ faqs }: FAQWindowProps) => {
	const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");

	const filteredFaqs = useMemo(
		() => faqs.filter((faq) => faq.category === activeCategory),
		[faqs, activeCategory],
	);

	return (
		<RetroWindow
			title="FAQs"
			framedContent
			toolbar={
				<FAQCategoryNav
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>
			}
		>
			<div className={styles.scrollArea}>
				<div className={styles.faqList}>
					{filteredFaqs.length > 0 ? (
						<FAQAccordion key={activeCategory} faqs={filteredFaqs} />
					) : (
						<p className={styles.emptyMessage}>
							No questions in this category yet.
						</p>
					)}
				</div>
				<Image
					src={slidePeter}
					alt=""
					className={styles.slidePeter}
					aria-hidden
				/>
			</div>
		</RetroWindow>
	);
};

export default FAQWindow;
