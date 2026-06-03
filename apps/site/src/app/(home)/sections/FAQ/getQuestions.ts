import { z } from "zod";
import { cache } from "react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { SanityDocument } from "@/lib/sanity/types";

const Questions = SanityDocument.extend({
	year: z.union([z.literal(2025), z.literal("2025")]).optional(),
	eventYear: z.union([z.literal(2025), z.literal("2025")]).optional(),
	archiveYear: z.union([z.literal(2025), z.literal("2025")]).optional(),
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

const faq2025Query = `*[
	_type == "faqs" &&
	(
		year == 2025 ||
		year == "2025" ||
		eventYear == 2025 ||
		eventYear == "2025" ||
		archiveYear == 2025 ||
		archiveYear == "2025" ||
		_id in ["faqs-2025", "2025-faqs", "zothacks-2025-faqs"]
	)
][0]`;

export const getQuestions = cache(async () => {
	if (!isSanityConfigured) return [];

	try {
		const questions2025 = await client.fetch(faq2025Query);
		const questions = questions2025 ?? (await client.fetch("*[_type == 'faqs'][0]"));

		return questions ? Questions.parse(questions).faqs : [];
	} catch (error) {
		console.warn("[getQuestions] Falling back to empty questions", error);
		return [];
	}
});
