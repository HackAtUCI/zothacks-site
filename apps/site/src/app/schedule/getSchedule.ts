import { z } from "zod";
import { cache } from "react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { SanityDocument } from "@/lib/sanity/types";
import { formatInTimeZone } from "date-fns-tz";

const Events = z.array(
	SanityDocument.extend({
		_type: z.literal("event"),
		year: z.union([z.literal(2023), z.literal("2023")]).optional(),
		title: z.string(),
		location: z.string().optional(),
		virtual: z.string().url().optional(),
		startTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
		endTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
		organization: z.string().optional(),
		hosts: z.array(z.string()).optional(),
		description: z.array(
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
	}),
);

const schedule2023Query = `*[
	_type == "event" &&
	(
		year == 2023 ||
		year == "2023" ||
		(startTime >= "2023-01-01T00:00:00Z" && startTime < "2024-01-01T00:00:00Z")
	)
] | order(startTime asc)`;

export const getSchedule = cache(async () => {
	if (!isSanityConfigured) return [];

	let events: z.infer<typeof Events>;

	try {
		events = Events.parse(await client.fetch(schedule2023Query));
	} catch (error) {
		console.warn("[getSchedule] Falling back to empty schedule", error);
		return [];
	}

	const eventsByDay = new Map<string, z.infer<typeof Events>>();

	events.forEach((event) => {
		const key = formatInTimeZone(
			new Date(event.startTime),
			"America/Los_Angeles",
			"MM/dd/yyyy",
		);
		eventsByDay.set(key, [...(eventsByDay.get(key) ?? []), event]);
	});

	return Array.from(eventsByDay.values());
});
