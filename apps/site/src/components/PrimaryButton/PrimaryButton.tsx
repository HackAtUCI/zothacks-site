"use client";
import React from "react";
import clsx from "clsx";

import styles from "./PrimaryButton.module.scss";
import Link from "next/link";

interface PrimaryButtonProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	variant?: "small" | "large";
}

const PrimaryButton = ({
	href,
	children,
	className,
	variant = "large",
}: PrimaryButtonProps) => {
	const variants = {
		small: styles.small,
		large: styles.large,
	};

	return href.startsWith("/") ? (
		<Link href={href} className={clsx(variants[variant], className)}>
			{children}
		</Link>
	) : (
		<a href={href} className={clsx(variants[variant], className)}>
			{children}
		</a>
	);
};

export default PrimaryButton;
