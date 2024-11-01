import { z } from "zod";
import { cache } from "react";
import { client } from "@/lib/sanity/client";
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
	return Clubs.parse(await client.fetch("*[_id == 'clubs'][0]"));
});
