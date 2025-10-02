"use client";
import React from "react";
import clsx from "clsx";

import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

const PrimaryButton = ({ href, children, className }: PrimaryButtonProps) => {
	return (
		<a href={href} className={clsx(styles.primaryButton, className)}>
			{children}
		</a>
	);
};

export default PrimaryButton;
