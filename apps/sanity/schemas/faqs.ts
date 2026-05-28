import { defineType, defineField, defineArrayMember } from "sanity";
import { toPlainText } from "@portabletext/react";
import { FileQuestion } from "lucide-react";

export default defineType({
	name: "faqs",
	title: "FAQs",
	type: "document",
	fields: [
		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "faq",
					fields: [
						defineField({
							name: "question",
							title: "Question",
							type: "text",
						}),
						defineField({
							name: "category",
							title: "Category",
							type: "string",
							options: {
								list: [
									{ title: "General", value: "general" },
									{ title: "Logistics", value: "logistics" },
									{ title: "Registration", value: "registration" },
									{ title: "Other", value: "other" },
								],
								layout: "radio",
								direction: "horizontal",
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "answer",
							title: "Answer",
							type: "array",
							of: [
								defineArrayMember({
									type: "block",
									styles: [{ title: "Normal", value: "normal" }],
									lists: [],
								}),
							],
						}),
					],

					preview: {
						select: {
							title: "question",
							subtitle: "answer",
							category: "category",
						},
						prepare({ title, subtitle, category }) {
							const answerPreview = subtitle
								? toPlainText(subtitle)
								: undefined;

							return {
								title,
								subtitle: category
									? `${category}${answerPreview ? ` — ${answerPreview}` : ""}`
									: answerPreview,
								media: FileQuestion,
							};
						},
					},
				}),
			],
		}),
	],
});
