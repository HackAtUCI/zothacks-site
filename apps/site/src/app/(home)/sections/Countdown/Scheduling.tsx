import Countdown from "./Countdown";
import { getSchedule } from "./getSchedule";

export default async function CountdownSchedule() {
	const schedule = (await getSchedule()).flat().map((el) => {
		return {
			title: el.title,
			startTime: el.startTime,
			endTime: el.endTime,
			location: el.location,
			virtual: el.virtual,
			organization: el.organization,
			hosts: el.hosts,
			description: el.description,
		};
	});
	return <Countdown schedule={schedule} />;
}
