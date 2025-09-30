import { Maintenance } from "@/views";
import HackerApplication from "./HackerApplication";

export const revalidate = 60;

const Component = process.env.MAINTENANCE_MODE_SCHEDULE ? Maintenance : HackerApplication;

export default Component;
