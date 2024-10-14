import { Maintenance } from "@/views";
import Schedule from "./schedule";

export const revalidate = 60;

const Component = process.env.MAINTENANCE_MODE_SCHEDULE
	? Maintenance
	: Schedule;

export default Component;
