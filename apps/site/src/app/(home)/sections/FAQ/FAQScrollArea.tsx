"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

import styles from "./FAQ.module.scss";

interface FAQScrollAreaProps {
	children: ReactNode;
}

const SCROLL_AMOUNT_PX = 80;
const MIN_SCROLL_INDICATOR_HEIGHT_PX = 48;

const FAQScrollArea = ({ children }: FAQScrollAreaProps) => {
	const scrollableContentRef = useRef<HTMLDivElement>(null);
	const scrollbarTrackRef = useRef<HTMLDivElement>(null);
	const [scrollIndicatorPosition, setScrollIndicatorPosition] = useState({
		height: MIN_SCROLL_INDICATOR_HEIGHT_PX,
		offsetTop: 0,
	});
	const [hasOverflowContent, setHasOverflowContent] = useState(false);

	const updateScrollIndicatorPosition = useCallback(() => {
		const scrollableContent = scrollableContentRef.current;
		const scrollbarTrack = scrollbarTrackRef.current;
		if (!scrollableContent || !scrollbarTrack) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollableContent;
		const contentOverflows = scrollHeight > clientHeight + 1;
		setHasOverflowContent(contentOverflows);

		if (!contentOverflows) {
			setScrollIndicatorPosition({
				height: scrollbarTrack.clientHeight,
				offsetTop: 0,
			});
			return;
		}

		const scrollbarTrackHeight = scrollbarTrack.clientHeight;
		const scrollIndicatorHeight = Math.max(
			MIN_SCROLL_INDICATOR_HEIGHT_PX,
			(clientHeight / scrollHeight) * scrollbarTrackHeight,
		);
		const maxIndicatorOffset = scrollbarTrackHeight - scrollIndicatorHeight;
		const scrollProgress = scrollTop / (scrollHeight - clientHeight);

		setScrollIndicatorPosition({
			height: scrollIndicatorHeight,
			offsetTop: scrollProgress * maxIndicatorOffset,
		});
	}, []);

	useEffect(() => {
		updateScrollIndicatorPosition();

		const scrollableContent = scrollableContentRef.current;
		if (!scrollableContent) return;

		const observer = new ResizeObserver(updateScrollIndicatorPosition);
		observer.observe(scrollableContent);

		return () => observer.disconnect();
	}, [updateScrollIndicatorPosition, children]);

	const scrollContentByStep = (direction: -1 | 1) => {
		scrollableContentRef.current?.scrollBy({
			top: direction * SCROLL_AMOUNT_PX,
			behavior: "smooth",
		});
	};

	return (
		<div className={styles.scrollArea}>
			<div
				ref={scrollableContentRef}
				className={styles.scrollContent}
				onScroll={updateScrollIndicatorPosition}
			>
				{children}
			</div>
			<div className={styles.scrollRail} aria-hidden={!hasOverflowContent}>
				<button
					type="button"
					className={styles.scrollButtonUp}
					tabIndex={-1}
					disabled={!hasOverflowContent}
					onClick={() => scrollContentByStep(-1)}
				/>
				<div ref={scrollbarTrackRef} className={styles.scrollTrack}>
					<div
						className={styles.scrollThumb}
						style={{
							height: `${scrollIndicatorPosition.height}px`,
							transform: `translateY(${scrollIndicatorPosition.offsetTop}px)`,
						}}
					/>
				</div>
				<button
					type="button"
					className={styles.scrollButtonDown}
					tabIndex={-1}
					disabled={!hasOverflowContent}
					onClick={() => scrollContentByStep(1)}
				/>
			</div>
		</div>
	);
};

export default FAQScrollArea;
