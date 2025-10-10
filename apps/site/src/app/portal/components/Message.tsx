import { Status } from "@/lib/userRecord";
import styles from "./Message.module.scss";

interface MessageProps {
	status: Status;
}

export default function Message({ status }: MessageProps) {
	let message: string;
	let header: string;

	switch (status) {
		case Status.Pending:
		case Status.Reviewed: {
			header = "";
			message = `Thank you for submitting your application! We are currently reviewing
					applications on a rolling basis, and you will hear back from us soon!`;
			break;
		}

		case Status.Accepted: {
			header = "Congratulations!";
			message = `Congratulations! You have been admitted to ZotHacks 2025! Please check
                        your email to sign your waiver and confirm your attendance!`;
			break;
		}
		case Status.Waitlisted: {
			header = "RSVP";
			message = `Thank you for applying to ZotHacks this year. We have read through
					many applications so far, and are able to offer you a spot on the
					event waitlist. Please check your email for more info about the
					waitlist and waitlist walk-ins!`;
			break;
		}
		case Status.Rejected: {
			header = "Sorry...";
			message = `Thank you for applying to ZotHacks this year. We have read through
					many applications so far, and unfortunately are unable to offer you a
					spot at our event. We highly encourage you to continue developing your
					skills and passion for technology. We would love to see you apply
					again next year!`;
			break;
		}

		case Status.Signed:
		case Status.Confirmed:
		case Status.Attending: {
			header = "";
			message = ``;
			break;
		}

		case Status.Void: {
			header = "";
			message = `Unfortunately, you are not able to RSVP for IrvineHacks at this time
					and will not be able to come to the event. However, we would love to
					see you apply again next year!`;
			break;
		}

		default: {
			const exhaustiveCheck: never = status;
			throw new Error(`Unhandled status: ${exhaustiveCheck}`);
		}
	}

	return (
		<div className={styles.messageWrapper}>
			<h4>{header}</h4>
			<p>{message}</p>
		</div>
	);
}
