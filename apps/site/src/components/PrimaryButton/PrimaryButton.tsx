"use client";
import Link from "next/link";
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
		<Link href={href} className={clsx(styles.primaryButton, className)}>
			{children}
		</Link>
	);
};

export default PrimaryButton;
