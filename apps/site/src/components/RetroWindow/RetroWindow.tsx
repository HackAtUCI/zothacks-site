import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import styles from "./RetroWindow.module.scss";

/**
 * Retro window shell: title bar, optional menu bar, main body, optional footer row.
 *
 * `children` (from `PropsWithChildren`) is the main body content.
 */
export interface RetroWindowProps extends PropsWithChildren {
	/** When true, shows the “File Edit Insert” menu bar (visual only). */
	isEdit?: boolean;
	/** Text shown in the blue gradient title bar. */
	title: string;
	/**
	 * When true, wraps the main `children` in the bordered panel; the child sets its
	 * own background (e.g. white). When false, children sit on the default gray (#E2E2E0).
	 */
	useChildBackground?: boolean;
	/**
	 * Optional row below the main child (e.g. toolbar), on the window gray unless
	 * `useChild2Background` is true.
	 */
	secondChild?: React.ReactNode;
	/**
	 * When true with `secondChild`, applies the same bordered panel treatment as
	 * `useChildBackground` for the second row (rare; e.g. home background picker).
	 */
	useChild2Background?: boolean;
}

const RetroWindow = ({
	title,
	children,
	isEdit = false,
	useChildBackground = false,
	secondChild,
	useChild2Background = false,
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

				<div className={clsx(styles.body, isEdit && styles.bodyWithMenu)}>
					{isEdit && (
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
					<div
						className={clsx(
							useChildBackground ? styles.childPanel : styles.childContent,
						)}
					>
						{children}
					</div>

					{secondChild != null && (
						<div
							className={clsx(
								useChild2Background ? styles.childPanel : styles.secondChild,
							)}
						>
							{secondChild}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RetroWindow;
