"use client";
import React from "react";
import styles from "./PrimaryButton.module.scss";

interface PrimaryButtonProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

const PrimaryButton = ({ href, children, className }: PrimaryButtonProps) => {
	return (
		<a href={href} className={`${styles.primaryButton} ${className || ""}`}>
			{children}
		</a>
	);
};

export default PrimaryButton;
