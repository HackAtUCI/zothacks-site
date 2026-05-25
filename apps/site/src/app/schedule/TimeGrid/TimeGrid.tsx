import styles from "./TimeGrid.module.scss";

interface TimeGridProps {
	selectedDay: string;
	friday: Array<any>;
	saturday: Array<any>;
	sunday: Array<any>;
    selectedEvent: any;
    onSelect: (event: any) => void;

}

export default function TimeGrid({
	selectedDay,
	friday,
	saturday,
	sunday,
    selectedEvent,
    onSelect,

}: TimeGridProps) {
	// Get the current day's events safely
	const getCurrentDayEvents = () => {
		switch (selectedDay) {
			case "Fri":
				return friday || [];
			case "Sat":
				return saturday || [];
			case "Sun":
				return sunday || [];
			default:
				return [];
		}
	};

    const formatHour = (date: Date) => {
        const h = date.getHours();
        return h > 12 ? h - 12 : h === 0 ? 12 : h;
    };

    const formatMinutes = (date: Date) => {
        return String(date.getMinutes()).padStart(2, "0");
    };

	const currentEvents = getCurrentDayEvents();

	return (
        <div className={styles.timeGrid}>
            <div className={styles.gridBody}>
                {currentEvents.map((event, index) => (
                        <div
                            key={event._id}
                            className={`${styles.gridRow} ${event._id === selectedEvent?._id ? styles.gridRowSelected : ""}`}
                            onClick={() => onSelect(event)}
                        >
                            <div className={styles.timeCell}>
                                <span className={styles.hour}>{formatHour(event.startTime)}</span>
                                <div className={styles.minutesStack}>
                                    <span className={styles.minutes}>{formatMinutes(event.startTime)}</span>
                                    <span className={styles.minutes}>{formatMinutes(event.endTime)}</span>
                                </div>
                            </div>
                            <div className={styles.eventCell}>
                                <span className={event._id === selectedEvent?._id ? styles.eventLinkSelected : styles.eventLink}>
                                    {event.title}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

	);
}
