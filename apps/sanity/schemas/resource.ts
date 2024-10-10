import { defineType, defineField, defineArrayMember } from "sanity";
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
			name: "resourceType",
			title: "Resource Type",
			type: "string",
			options: {
				list: [
					{ title: "API", value: "api" },
					{ title: "Backend", value: "backend" },
					{ title: "Frontend", value: "frontend" },
					{ title: "Starter Pack", value: "starter-pack" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				}),
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
			name: "background",
			title: "Island Background",
			description:
				"There are 4 different backgrounds to make the islands look unique",
			type: "image",
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
