import { getQuestions } from "./getQuestions";
import FAQWindow from "./FAQWindow";

import styles from "./FAQ.module.scss";

const FAQ = async () => {
	const questions = await getQuestions();
	const faqs = questions[0]?.faqs ?? [];

	return (
		<section className={styles.container}>
			<div className={styles.windowWrapper}>
				<FAQWindow faqs={faqs} />
			</div>
		</section>
	);
};

export default FAQ;
