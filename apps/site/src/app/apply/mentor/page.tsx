import { Maintenance } from "@/views";
import MentorsForm from "./MentorsForm";

export const revalidate = 60;

const Component = process.env.MAINTENANCE_MODE_SCHEDULE
	? Maintenance
	: MentorsForm;

export default Component;
