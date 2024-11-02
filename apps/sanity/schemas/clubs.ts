import { defineType, defineField, defineArrayMember } from "sanity";
import { Handshake } from "lucide-react";

export default defineType({
	name: "clubs",
	title: "Clubs",
	type: "document",
	icon: Handshake,
	fields: [
		defineField({
			name: "clubs",
			title: "Clubs",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "club",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "url",
							title: "URL",
							type: "url",
						}),
						defineField({
							name: "logo",
							title: "Logo",
							type: "image",
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
		}),
	],
});
