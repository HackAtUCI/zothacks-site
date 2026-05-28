import styles from "./EventInfo.module.scss";

interface EventInfoProps {
	event: any;
}

const getDescriptionText = (description: any[]) => {
	return (
		description
			?.map((block) => block.children?.map((c: any) => c.text).join(""))
			.join("\n") ?? ""
	);
};

export default function EventInfo({ event }: EventInfoProps) {
	if (!event)
		return (
			<div className={styles.infoPanel}>
				<p className={styles.empty}>Select an event</p>
			</div>
		);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    const description = getDescriptionText(event.description);

    return (
        <div className={styles.infoPanel}>
            <p className={styles.title}>{event.title}</p>
            <p className={styles.time}>
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </p>
            {event.location && (
                <p className={styles.location}>{event.location}</p>
            )}
            {description && (
                <p className={styles.description}>{description}</p>
            )}
        </div>
    );
}