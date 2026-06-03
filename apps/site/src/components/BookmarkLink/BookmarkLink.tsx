import { PropsWithChildren } from "react";
import Button from "react-bootstrap/Button";

import styles from "./BookmarkLink.module.scss";

interface BookmarkLinkProps {
	className?: string;
	href: string;
	disabled?: boolean;
	target?: string;
}

export default function BookmarkLink({
	className,
	href,
	target,
	disabled = false,
	children,
}: PropsWithChildren<BookmarkLinkProps>) {
	return (
		<Button
			className={styles.bookmarkLink + " " + className}
			variant=""
			href={href}
			target={target}
			disabled={disabled}
		>
			{children}
		</Button>
	);
}
