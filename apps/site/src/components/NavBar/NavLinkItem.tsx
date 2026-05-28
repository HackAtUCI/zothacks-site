import Image from "next/image";
import { PropsWithChildren } from "react";
import clsx from "clsx";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "./NavLinkItem.module.scss";

interface NavLinkItemInterface extends PropsWithChildren {
	href: string;
	className?: string;
	icon?: string;
	iconSize?: number;
}

export default function NavLinkItem({
	href,
	className,
	icon,
	iconSize = 40,
	children,
	...props
}: NavLinkItemInterface) {
	const searchParams = useSearchParams();

	return (
		<Link
			href={href}
			className={clsx(
				className,
				searchParams.has("overlay", href.split("=").at(-1)) ? styles.active : styles.notActive,
			)}
			{...props}
		>
			{icon && (
				<span className={styles.icon}>
					<Image src={icon} alt="" width={iconSize} height={iconSize} />
				</span>
			)}
			{children}
		</Link>
	);
}