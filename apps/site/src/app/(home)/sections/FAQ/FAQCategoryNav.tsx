"use client";

import clsx from "clsx";

import { FAQ_CATEGORIES, FAQCategory } from "./faqCategories";

import styles from "./FAQ.module.scss";

interface FAQCategoryNavProps {
	activeCategory: FAQCategory;
	onCategoryChange: (category: FAQCategory) => void;
}

const FAQCategoryNav = ({
	activeCategory,
	onCategoryChange,
}: FAQCategoryNavProps) => {
	return (
		<nav className={styles.categoryNav} aria-label="FAQ categories">
			{FAQ_CATEGORIES.map((category) => (
				<button
					key={category}
					type="button"
					className={clsx(
						styles.categoryButton,
						activeCategory === category && styles.categoryButtonActive,
					)}
					onClick={() => onCategoryChange(category)}
					aria-pressed={activeCategory === category}
				>
					{category}
				</button>
			))}
		</nav>
	);
};

export default FAQCategoryNav;
