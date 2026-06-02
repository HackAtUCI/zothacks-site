import { z } from "zod";
import { cache } from "react";
import { client, isSanityConfigured } from "@/lib/sanity/client";
import { SanityDocument, SanityImageReference } from "@/lib/sanity/types";

const Clubs = SanityDocument.extend({
	clubs: z.array(
		z.object({
			_type: z.literal("club"),
			_key: z.string(),
			name: z.string(),
			url: z.string().url().optional(),
			logo: SanityImageReference,
		}),
	),
});

export const getClubs = cache(async () => {
	if (!isSanityConfigured) return Clubs.parse({ clubs: [] });

	try {
		return Clubs.parse(await client.fetch("*[_id == 'clubs'][0]"));
	} catch (error) {
		console.warn("[getClubs] Falling back to empty clubs", error);
		return Clubs.parse({ clubs: [] });
	}
});
