import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { HeartHandshake, BadgeHelp } from "lucide-react";

export default defineConfig({
	name: "default",
	title: "zothacks-site-2023",

	projectId: "tz8iut6e",
	dataset: "production",

	plugins: [
		deskTool({
			structure: (S) =>
				S.list()
					.title("Content")
					.items([
						S.listItem()
							.title("Sponsors")
							.icon(HeartHandshake)
							.child(
								S.document()
									.schemaType("sponsors")
									.documentId("sponsors")
									.title("Sponsors")
							),
						S.listItem()
							.title("FAQs")
							.icon(BadgeHelp)
							.child(
								S.document().schemaType("faqs").documentId("faqs").title("FAQs")
							),
						S.divider(),
						...S.documentTypeListItems().filter(
							(listItem) => !["faqs", "sponsors"].includes(listItem.getId()!)
						),
					]),
		}),
		visionTool(),
		colorInput(),
		media(),
	],

	schema: {
		types: schemaTypes,
	},
});
