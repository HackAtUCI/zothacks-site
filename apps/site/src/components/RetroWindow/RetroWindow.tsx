import type { PropsWithChildren, ReactNode } from "react";

import RetroWindowClient from "./RetroWindowClient";

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
	/** When `framedContent` is true, controls the panel color. Defaults to `"light"`. */
	contentTheme?: "light" | "dark";
	/** Optional row above the main content, e.g. tabs, filters, or tools. */
	toolbar?: ReactNode;
	/** Optional row below the main content, e.g. status text or actions. */
	footer?: ReactNode;
	/** Optional background color override for the framed content area. */
	contentBackground?: string;
	/** When true, the title bar temporarily drags the window before snapping back. */
	draggable?: boolean;
	/** Optional href for a Windows-style close control in the title bar. */
	closeHref?: string;
}

const RetroWindow = (props: RetroWindowProps) => {
	return <RetroWindowClient {...props} />;
};

export default RetroWindow;
