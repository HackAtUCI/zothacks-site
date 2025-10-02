"use client";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
	href?: string;
	type?: "submit" | "reset" | "button" | undefined;
	className?: string;
	variant?: "small" | "large";
	disabled?: boolean;
	children: React.ReactNode;
}

const PrimaryButton = ({
	href,
	type,
	className,
	variant = "large",
	disabled = false,
	children,
}: PrimaryButtonProps) => {
	const variants = {
		small: styles.small,
		large: styles.large,
	};

	if (!href) {
		return (
			<button
				type={type}
				className={clsx(variants[variant], className)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}

	return href.startsWith("/") ? (
		<Link
			href={href}
			type={type}
			className={clsx(variants[variant], className)}
		>
			{children}
		</Link>
	) : (
		<a href={href} type={type} className={clsx(variants[variant], className)}>
			{children}
		</a>
	);
};

export default PrimaryButton;
