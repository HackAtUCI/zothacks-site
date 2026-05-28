"use client";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import clsx from "clsx";

import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
	href?: string;
	type?: "submit" | "reset" | "button" | undefined;
	className?: string;
	variant?: "small" | "large";
	color?: "blue" | "green";
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
}

const PrimaryButton = ({
	href,
	type,
	className,
	variant = "large",
	color = "blue",
	disabled = false,
	onClick,
	children,
}: PrimaryButtonProps) => {
	const variants = {
		small: styles.small,
		large: styles.large,
	};
	const colors = {
		blue: styles.blue,
		green: styles.green,
	};

	if (!href) {
		return (
			<button
				type={type}
				className={clsx(variants[variant], colors[color], className)}
				disabled={disabled}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}

	return href.startsWith("/") || href.startsWith("#") ? (
		<Link
			href={href}
			type={type}
			className={clsx(variants[variant], colors[color], className)}
		>
			{children}
		</Link>
	) : (
		<a
			href={href}
			type={type}
			className={clsx(variants[variant], colors[color], className)}
		>
			{children}
		</a>
	);
};

export default PrimaryButton;
