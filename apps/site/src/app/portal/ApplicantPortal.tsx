"use client";

import { redirect } from "next/navigation";

import useUserIdentity from "@/lib/utils/useUserIdentity";
import { Status } from "@/lib/userRecord";
import Message from "./components/Message";
import ActionButton from "./components/ActionButton";
import Timeline from "./components/Timeline";

import styles from "./ApplicantPortal.module.scss";

function Portal() {
	const identity = useUserIdentity();

	if (!identity) {
		return <div>Loading...</div>;
	}

	const status = identity.status as Status;

	if (status === null) {
		redirect("/apply");
	} else {
		return (
			<div className={styles.container}>
				<h1>Portal</h1>

				<div className={styles.wrapper}>
					<Timeline status={status} />

					<Message status={status} />

					<ActionButton status={status} />
				</div>
			</div>
		);
	}
}

export default Portal;
