import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import styles from "./RetroWindow.module.scss";

/**
 * Retro window shell: title bar, optional menu bar, optional toolbar,
 * main body, and optional footer row.
 *
 * `children` (from `PropsWithChildren`) is the main body content.
 */
export interface RetroWindowProps extends PropsWithChildren {
	/** When true, shows the “File Edit Insert” menu bar (visual only). */
	showEditBar?: boolean;
	/** Text shown in the blue gradient title bar. */
	title: string;
	/**
	 * When true, wraps the main `children` in the bordered panel; the child sets its
	 * own background (e.g. white). When false, children sit on the default gray (#E2E2E0).
	 */
	framedContent?: boolean;
	/** Optional row above the main content, e.g. tabs, filters, or tools. */
	toolbar?: React.ReactNode;
	/** Optional row below the main content, e.g. status text or actions. */
	footer?: React.ReactNode;
	/** Optional background color override for the framed content area. */
	contentBackground?: string;
}

const RetroWindow = ({
	title,
	children,
	showEditBar = false,
	framedContent = false,
	toolbar,
	footer,
	contentBackground,
}: RetroWindowProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.mainContainer}>
				<div className={styles.gradientHeader}>
					<span className={styles.title}>{title}</span>
					<div className={styles.controls}>
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
						)}
						style={{ backgroundColor: contentBackground }}
					>
						{children}
					</div>

					{footer != null && <div className={styles.footer}>{footer}</div>}
				</div>
			</div>
		</div>
	);
};

export default RetroWindow;
