import { Status } from "@/lib/userRecord";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

interface ActionButtonProps {
	status: Status;
}

export default function ActionButton({ status }: ActionButtonProps) {
	let buttonJSX: JSX.Element;

	switch (status) {
		case Status.Rejected:
		case Status.Void:
		case Status.Pending:
		case Status.Reviewed:
		case Status.Accepted:
		case Status.Waitlisted:
		case Status.Signed:
		case Status.Confirmed:
		case Status.Attending: {
			buttonJSX = (
				<PrimaryButton variant="large" href="/">
					Return to Homepage
				</PrimaryButton>
			);
			break;
		}

		// case Status.Waitlisted: {
		//     buttonJSX = <button className={styles.actionButton}>I am no longer able to attend ZotHacks 2025</button>;
		//     break;
		// }

		default: {
			const exhaustiveCheck: never = status;
			throw new Error(`Unhandled status: ${exhaustiveCheck}`);
		}
	}

	return buttonJSX;
}
