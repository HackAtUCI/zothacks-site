import { z } from "zod";
import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { SanityDocument } from "@/lib/sanity/types";

const Resources = z.array(
	SanityDocument.extend({
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
		resourceType: z.string(),
		link: z.string(),
		logo: z.object({
			_type: z.string(),
			asset: z.object({
				_ref: z.string(),
				_type: z.literal("reference"),
			}),
		}),
		background: z.object({
			_type: z.string(),
			asset: z.object({
				_ref: z.string(),
				_type: z.literal("reference"),
			}),
		}),
		title: z.string(),
	}),
);

export const getResources = cache(async (resourceType: string) => {
	return Resources.parse(
		await client.fetch(
			`*[_type == 'resource' && resourceType == '${resourceType}'] | order(lower(title) asc)`,
		),
	);
});
