"use client";

import { FormEvent, PropsWithChildren, useState } from "react";
import axios from "axios";

import api from "@/lib/utils/api";
import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

interface BaseFormProps {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
	applyPath: string;
}

export default function BaseForm({
	applicationType,
	applyPath,
	children,
}: PropsWithChildren<BaseFormProps>) {
	const [sessionExpired, setSessionExpired] = useState(false);

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		// Disable native post submission
		event.preventDefault();

		// On the chance that a user presses submit after the deadline,
		// this check is to prevent the application from submitting
		// and to show the message that applications have closed
		if (hasDeadlinePassed()) {
			window.location.reload();
			return;
		}

		setSessionExpired(false);

		const formData = new FormData(event.currentTarget);

		try {
			const res = await api.post(applyPath, formData);
			if (res.status === 201) {
				console.log("Application submitted");

				// Use window.location instead of router.push in order
				// to force reload the page to allow user identity to
				// update with the new status
				window.location.href = "/portal";
				return;
			}
		} catch (err) {
			console.error(err);
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401) {
					setSessionExpired(true);
				}
			}
		}
	};

	const sessionExpiredMessage = (
		<p className="text-red-500 w-11/12">
			Your session has expired. Please{" "}
			<a href="/login" target="_blank" className="text-blue-600 underline">
				log in from a new tab
			</a>{" "}
			to restore your session and then try submitting again.
		</p>
	);

	return (
		<form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
			<input
				type="text"
				name="application_type"
				value={applicationType}
				readOnly
				hidden
			/>
			{children}
			{sessionExpired && sessionExpiredMessage}
		</form>
	);
}
