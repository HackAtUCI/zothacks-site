import Image from "next/image";
import { PropsWithChildren } from "react";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
	const activeRoute = usePathname();

	return (
		<Link
			href={href}
			className={clsx(
				className,
				activeRoute === href ? styles.active : styles.notActive,
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