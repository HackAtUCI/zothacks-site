import { Status } from "@/lib/userRecord";
import styles from "./ActionButton.module.scss";
import Link from "next/link";

interface ActionButtonProps {
	status: Status;
}

export default function ActionButton({ status }: ActionButtonProps) {
	let buttonJSX: JSX.Element;

	switch (status) {
		case Status.Rejected:
		case Status.Void: {
			buttonJSX = (
				<Link href="/" className={styles.actionButton}>
					Return to Homepage
				</Link>
			);
			break;
		}

		case Status.Signed:
		case Status.Confirmed:
		case Status.Attending:
		case Status.Accepted:
		case Status.Waitlisted:

		// TODO: Add a button to withdraw from the event

		// case Status.Waitlisted: {
		//     buttonJSX = <button className={styles.actionButton}>I am no longer able to attend ZotHacks 2025</button>;
		//     break;
		// }

		case Status.Pending:
		case Status.Reviewed: {
			buttonJSX = <></>;
			break;
		}

		default: {
			const exhaustiveCheck: never = status;
			throw new Error(`Unhandled status: ${exhaustiveCheck}`);
		}
	}

	return buttonJSX;
}
