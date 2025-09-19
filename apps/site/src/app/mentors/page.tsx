import { Maintenance } from "@/views";
import Mentors from "./Mentors";

export const revalidate = 60;

const Component = process.env.MAINTENANCE_MODE_SCHEDULE
	? Maintenance
	: Mentors;

export default Component;
