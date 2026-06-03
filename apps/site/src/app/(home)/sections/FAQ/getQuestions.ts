import { z } from "zod";
import { cache } from "react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { SanityDocument } from "@/lib/sanity/types";

const Questions = SanityDocument.extend({
	year: z.union([z.literal(2023), z.literal("2023")]).optional(),
	eventYear: z.union([z.literal(2023), z.literal("2023")]).optional(),
	archiveYear: z.union([z.literal(2023), z.literal("2023")]).optional(),
	faqs: z.array(
		z.object({
			answer: z.array(
				z.object({
					_key: z.string(),
					markDefs: z.array(
						z.object({
							_type: z.string(),
							href: z.optional(z.string()),
							_key: z.string(),
						}),
					),
					children: z.array(
						z.object({
							text: z.string(),
							_key: z.string(),
							_type: z.literal("span"),
							marks: z.array(z.string()),
						}),
					),
					_type: z.literal("block"),
					style: z.literal("normal"),
				}),
			),
			question: z.string(),
			_type: z.literal("faq"),
			_key: z.string(),
		}),
	),
});

const faq2023Query = `*[
	_type == "faqs" &&
	(
		year == 2023 ||
		year == "2023" ||
		eventYear == 2023 ||
		eventYear == "2023" ||
		archiveYear == 2023 ||
		archiveYear == "2023" ||
		_id in ["faqs-2023", "2023-faqs", "zothacks-2023-faqs"]
	)
][0]`;

export const getQuestions = cache(async () => {
	if (!isSanityConfigured) return [];

	try {
		const questions2023 = await client.fetch(faq2023Query);
		const questions = questions2023 ?? (await client.fetch("*[_type == 'faqs'][0]"));

		return questions ? Questions.parse(questions).faqs : [];
	} catch (error) {
		console.warn("[getQuestions] Falling back to empty questions", error);
		return [];
	}
});
