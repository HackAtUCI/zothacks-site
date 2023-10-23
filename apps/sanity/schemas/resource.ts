import { defineType, defineField } from "sanity";
import { Globe } from "lucide-react";

export default defineType({
	name: "resource",
	title: "Resources",
	type: "document",
	icon: Globe,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "array",
			of: [
				{
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "link",
			title: "Link",
			type: "url",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "stickyNoteColor",
			title: "Sticky Note Color",
			description:
				"Note that the color will be used as a background for black text, so please choose a color with enough contrast.",
			type: "color",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
			media: "logo",
		},
	},
});