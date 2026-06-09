import { redirect } from "next/navigation";

import { Maintenance } from "@/views";
import MentorApplication from "./MentorApplication";
import getUserIdentity from "@/lib/utils/getUserIdentity";

export const revalidate = 60;

export default async function Page() {
	if (process.env.MAINTENANCE_MODE_APPLICATION) {
		return <Maintenance />;
	}

	const { status, uid } = await getUserIdentity();

	if (status) redirect("/portal");
	if (!uid) redirect("/login");

	return <MentorApplication />;
}
