"use client";

import { redirect } from "next/navigation";

import useUserIdentity from "@/lib/utils/useUserIdentity";
import { Status } from "@/lib/userRecord";

const rolesArray = ["Mentor", "Hacker", "Volunteer"];

function Portal() {
	const identity = useUserIdentity();

	if (!identity) {
		return <div>Loading...</div>;
	}

	const status = identity.status;

	if (status === null) {
		redirect("/apply-mentor");
	} else {
		// redirect to confirmation page for now
		// redirect()
	}
	return <></>;
}

export default Portal;
