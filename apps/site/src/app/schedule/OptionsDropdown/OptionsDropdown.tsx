import styles from "./OptionsDropdown.module.scss";

interface OptionsDropdownProps {
	selectedDay: string;
	dayOne: Array<any>;
	dayTwo: Array<any>;
	dayThree: Array<any>;
}

export default function OptionsDropdown({
	selectedDay,
	dayOne,
	dayTwo,
	dayThree,
}: OptionsDropdownProps) {
	// Get the current day's events safely
	const getCurrentDayEvents = () => {
		switch (selectedDay) {
			case "dayOne":
				return dayOne || [];
			case "dayTwo":
				return dayTwo || [];
			case "dayThree":
				return dayThree || [];
			default:
				return [];
		}
	};

	// Format time helper function
	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const currentEvents = getCurrentDayEvents();

	return (
		<div className={styles.optionsDropdown}>
			<div className={styles.optionsDropdownContent}>
				{currentEvents.map((event, index) => (
					<div className={styles.optionsDropdownContentItem} key={event._id}>
						<h1>{event.title}</h1>
						<span>
							{formatTime(event.startTime)} - {formatTime(event.endTime)}
						</span>
						<span>{event.location}</span>
					</div>
				))}
			</div>
		</div>
	);
}
