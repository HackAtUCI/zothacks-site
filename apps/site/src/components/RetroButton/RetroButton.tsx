import Link from "next/link";
import clsx from "clsx";
import styles from "./RetroButton.module.scss";

interface RetroButtonProps {
	href?: string;
	type?: "submit" | "reset" | "button";
	className?: string;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

const RetroButton = ({
	href,
	type = "button",
	className,
	disabled,
	onClick,
	children,
}: RetroButtonProps) => {
	const cls = clsx(styles.button, className);

	if (href) {
		return href.startsWith("/") || href.startsWith("#") ? (
			<Link href={href} className={cls}>
				{children}
			</Link>
		) : (
			<a href={href} className={cls}>
				{children}
			</a>
		);
	}

	return (
		<button type={type} className={cls} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};

export default RetroButton;
