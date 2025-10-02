import { PropsWithChildren } from "react";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavLinkItem.module.scss";

interface NavLinkItemInterface extends PropsWithChildren {
	href: string;
	className?: string;
}

export default function NavLinkItem({
	href,
	className,
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
			{children}
		</Link>
	);
}
