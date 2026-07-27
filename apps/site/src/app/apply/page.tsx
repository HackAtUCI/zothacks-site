import { redirect } from "next/navigation";

import { Maintenance } from "@/views";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import ApplyLanding from "./ApplyLanding";

export const revalidate = 60;

export default async function Page() {
	if (process.env.MAINTENANCE_MODE_APPLICATION) {
		return <Maintenance />;
	}

	const { status } = await getUserIdentity();

	if (status) redirect("/portal");

	return <ApplyLanding />;
}
