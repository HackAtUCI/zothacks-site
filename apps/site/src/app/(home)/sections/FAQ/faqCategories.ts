export const FAQ_CATEGORIES = [
	"general",
	"logistics",
	"registration",
	"other",
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];

export const FAQ_CATEGORY_LABELS: Record<FAQCategory, string> = {
	general: "General",
	logistics: "Logistics",
	registration: "Registration",
	other: "Other",
};
