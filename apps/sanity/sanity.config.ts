import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";
import { HeartHandshake, BadgeHelp, CalendarClock } from "lucide-react";

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
							.title("FAQs 2023")
							.icon(BadgeHelp)
							.child(
								S.document()
									.schemaType("faqs")
									.documentId("faqs-2023")
									.title("FAQs 2023")
							),
						S.listItem()
							.title("FAQs")
							.icon(BadgeHelp)
							.child(
								S.document().schemaType("faqs").documentId("faqs").title("FAQs")
							),
						S.listItem()
							.title("Events 2023")
							.icon(CalendarClock)
							.child(
								S.documentList()
									.title("Events 2023")
									.schemaType("event")
									.filter(
										'_type == "event" && (year == 2023 || year == "2023" || (startTime >= "2023-01-01T00:00:00Z" && startTime < "2024-01-01T00:00:00Z"))'
									)
							),
						S.divider(),
						...S.documentTypeListItems().filter(
							(listItem) =>
								!["event", "faqs", "sponsors"].includes(listItem.getId()!)
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
