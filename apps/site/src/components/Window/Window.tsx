import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import styles from "./Window.module.scss";

export interface WindowProps extends PropsWithChildren {
	isEdit?: boolean;
	title: string;
	useChildBackground?: boolean;
	secondChild?: React.ReactNode;
	useChild2Background?: boolean;
}

// Props:
//  isEdit: bool -- has edit header e.g. File, Edit Insert (visual only)
//  title: string -- title of the window
//  children: PropsWithChildren -- main child component
//  useChildBackground: bool -- bordered panel; child supplies its own background (e.g. white, black)
//  secondChild: PropsWithChildren -- optional child component that is outside the main background
//  useChild2Background: bool -- bordered panel for secondChild; child supplies its own background
//    ^ lowk only used for the home page background changing window
const Window = ({
	title,
	children,
	isEdit = false,
	useChildBackground = false,
	secondChild,
	useChild2Background = false,
}: WindowProps) => {
	return (
		<div className={styles.window}>
			{/* Main Content */}
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

				{isEdit && (
					<nav className={styles.editMenu} aria-hidden>
						<span>File</span>
						<span>Edit</span>
						<span>Insert</span>
					</nav>
				)}

				<div className={styles.body}>
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
								useChild2Background
									? styles.childPanel
									: styles.secondChild,
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

export default Window;
