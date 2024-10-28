import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { HeartHandshake, BadgeHelp, Handshake } from "lucide-react";

export default defineConfig({
	name: "default",
	title: "zothacks-site-2023",

	projectId: "tz8iut6e",
	dataset: "production",

	plugins: [
		structureTool({
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
									.title("Sponsors"),
							),
						S.listItem()
							.title("Clubs")
							.icon(Handshake)
							.child(
								S.document()
									.schemaType("clubs")
									.documentId("clubs")
									.title("Clubs"),
							),
						S.listItem()
							.title("FAQs")
							.icon(BadgeHelp)
							.child(
								S.document()
									.schemaType("faqs")
									.documentId("faqs")
									.title("FAQs"),
							),
						S.divider(),
						...S.documentTypeListItems().filter(
							(listItem) =>
								!["faqs", "sponsors", "clubs"].includes(listItem.getId()!),
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
