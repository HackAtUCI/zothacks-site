import { Status, Decision } from "@/lib/userRecord";
import StatusIndicator from "./StatusIndicator";

import check from "@/assets/icons/check.svg";
import dots from "@/assets/icons/dots.svg";
import x from "@/assets/icons/x.svg";

import styles from "./Timeline.module.scss";

interface TimelineProps {
	status: Status;
}

export default function Timeline({ status }: TimelineProps) {
	return (
		<div className={styles.statusWrapper}>
			{(Object.values(Decision).includes(status as Decision) ||
				status === Status.Signed ||
				status === Status.Confirmed) && (
				<StatusIndicator icon={check} dark={true}>
					Application Submitted
				</StatusIndicator>
			)}

			{(status === Status.Accepted ||
				status === Status.Signed ||
				status === Status.Confirmed) && (
				<>
					<StatusIndicator icon={check} dark={true}>
						Application Accepted
					</StatusIndicator>
					<StatusIndicator
						icon={dots}
						dark={status === Status.Signed || status === Status.Confirmed}
					>
						Waiver Signed
					</StatusIndicator>
					<StatusIndicator icon={dots} dark={status === Status.Confirmed}>
						Attendance Confirmed
					</StatusIndicator>
				</>
			)}

			{status === Status.Waitlisted && (
				<StatusIndicator icon={dots} dark={true}>
					Waitlisted
				</StatusIndicator>
			)}

			{status === Status.Rejected && (
				<StatusIndicator icon={x} dark={true}>
					Application Rejected
				</StatusIndicator>
			)}
		</div>
	);
}
