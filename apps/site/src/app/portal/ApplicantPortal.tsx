"use client";

import { redirect } from "next/navigation";

import useUserIdentity from "@/lib/utils/useUserIdentity";

import ConfirmationPage from "./ConfirmationPage";

function Portal() {
	const identity = useUserIdentity();

	if (!identity) {
		return <div>Loading...</div>;
	}

	const status = identity.status;

	if (status === null) {
		redirect("/apply");
	} else {
		return <ConfirmationPage status={status} />;
	}
}

export default Portal;
