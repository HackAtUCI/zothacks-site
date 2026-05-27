"use client";

import clsx from "clsx";
import { motion, useAnimationControls, useDragControls } from "framer-motion";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

import styles from "./RetroWindow.module.scss";

export interface RetroWindowClientProps extends PropsWithChildren {
	showEditBar?: boolean;
	title: string;
	framedContent?: boolean;
	contentTheme?: "light" | "dark";
	toolbar?: ReactNode;
	footer?: ReactNode;
	contentBackground?: string;
	draggable?: boolean;
	snapBack?: boolean;
	closeHref?: string;
}

const RetroWindowClient = ({
	title,
	children,
	showEditBar = false,
	framedContent = false,
	contentTheme = "light",
	toolbar,
	footer,
	contentBackground,
	draggable = true,
	snapBack = true,
	closeHref,
}: RetroWindowClientProps) => {
	const dragControls = useDragControls();
	const animationControls = useAnimationControls();

	return (
		<motion.div
			className={styles.root}
			animate={animationControls}
			drag={draggable}
			dragControls={dragControls}
			dragElastic={0.08}
			dragListener={false}
			dragMomentum={false}
			onDragEnd={() => {
				if (snapBack) {
					void animationControls.start({
						x: 0,
						y: 0,
						transition: { type: "spring", stiffness: 520, damping: 34 },
					});
				}
			}}
			transition={{ type: "spring", stiffness: 520, damping: 34 }}
			whileDrag={{ scale: 1.01 }}
		>
			<div className={styles.mainContainer}>
				<div
					className={clsx(
						styles.gradientHeader,
						draggable && styles.draggableHeader,
					)}
					onPointerDown={(event) => {
						if (draggable && event.button === 0) {
							dragControls.start(event);
						}
					}}
				>
					<span className={styles.title}>{title}</span>
					<div
						className={styles.controls}
						onPointerDown={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							className={styles.windowControl}
							aria-label="Minimize"
							tabIndex={-1}
						>
							<span className={styles.controlBevel}>
								<span className={styles.minimizeIcon} aria-hidden />
							</span>
						</button>
						<button
							type="button"
							className={styles.windowControl}
							aria-label="Maximize"
							tabIndex={-1}
						>
							<span className={styles.controlBevel}>
								<span className={styles.maximizeIcon} aria-hidden />
							</span>
						</button>
						{closeHref != null && (
							<Link
								href={closeHref}
								scroll={false}
								className={clsx(
									styles.windowControl,
									styles.closeWindowControl,
								)}
								aria-label="Close"
							>
								<span className={styles.controlBevel}>
									<span className={styles.closeIcon} aria-hidden />
								</span>
							</Link>
						)}
					</div>
				</div>

				<div className={clsx(styles.body, showEditBar && styles.bodyWithMenu)}>
					{showEditBar && (
						<nav className={styles.editMenu} aria-hidden>
							<span>
								<span className={styles.menuKey}>F</span>ile
							</span>
							<span>
								<span className={styles.menuKey}>E</span>dit
							</span>
							<span>
								<span className={styles.menuKey}>I</span>nsert
							</span>
						</nav>
					)}

					{toolbar != null && <div className={styles.toolbar}>{toolbar}</div>}

					<div
						className={clsx(
							styles.content,
							framedContent && styles.contentFrame,
							framedContent &&
								contentTheme === "dark" &&
								styles.contentFrameDark,
						)}
						style={{ backgroundColor: contentBackground }}
					>
						{children}
					</div>

					{footer != null && <div className={styles.footer}>{footer}</div>}
				</div>
			</div>
		</motion.div>
	);
};

export default RetroWindowClient;
