import { PortableText } from "@portabletext/react";
import ClipboardSchedule from "./ClipboardSchedule";
import { getSchedule } from "./getSchedule";

import styles from "./Schedule.module.scss";
import DayOne from "./DayOne/DayOne";
import Header from "./Header/Header";
import DayTwo from "./DayTwo/DayTwo";

export default async function Schedule() {
	const schedule = await getSchedule();
	// console.log(schedule[0])
	return (
		<div>
			<Header />
			<DayOne schedule={schedule[0]} />
			<DayTwo schedule={schedule[1]} />
		</div>
	);
}
