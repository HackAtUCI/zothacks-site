"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type PointerEvent,
	type ReactNode,
} from "react";

import styles from "./MentorIntro.module.scss";

interface MentorScrollAreaProps {
	children: ReactNode;
}

const SCROLL_AMOUNT_PX = 80;
const MIN_SCROLL_INDICATOR_HEIGHT_PX = 48;

export default function MentorScrollArea({ children }: MentorScrollAreaProps) {
	const scrollableContentRef = useRef<HTMLDivElement>(null);
	const scrollbarTrackRef = useRef<HTMLDivElement>(null);
	const dragStartRef = useRef({ pointerY: 0, scrollTop: 0 });
	const isDraggingThumbRef = useRef(false);
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

	const getScrollMetrics = useCallback(() => {
		const scrollableContent = scrollableContentRef.current;
		const scrollbarTrack = scrollbarTrackRef.current;
		if (!scrollableContent || !scrollbarTrack) return null;

		const { scrollHeight, clientHeight } = scrollableContent;
		const scrollbarTrackHeight = scrollbarTrack.clientHeight;
		const scrollIndicatorHeight = Math.max(
			MIN_SCROLL_INDICATOR_HEIGHT_PX,
			(clientHeight / scrollHeight) * scrollbarTrackHeight,
		);
		const maxIndicatorOffset = scrollbarTrackHeight - scrollIndicatorHeight;
		const maxScrollTop = scrollHeight - clientHeight;

		return { maxIndicatorOffset, maxScrollTop };
	}, []);

	const handleThumbPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!hasOverflowContent) return;

		event.preventDefault();
		const scrollableContent = scrollableContentRef.current;
		if (!scrollableContent) return;

		dragStartRef.current = {
			pointerY: event.clientY,
			scrollTop: scrollableContent.scrollTop,
		};
		isDraggingThumbRef.current = true;
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handleThumbPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!isDraggingThumbRef.current) return;

		const scrollableContent = scrollableContentRef.current;
		const metrics = getScrollMetrics();
		if (!scrollableContent || !metrics || metrics.maxIndicatorOffset <= 0)
			return;

		const deltaY = event.clientY - dragStartRef.current.pointerY;
		const scrollDelta =
			(deltaY / metrics.maxIndicatorOffset) * metrics.maxScrollTop;

		scrollableContent.scrollTop = Math.min(
			metrics.maxScrollTop,
			Math.max(0, dragStartRef.current.scrollTop + scrollDelta),
		);
	};

	const endThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
		if (!isDraggingThumbRef.current) return;

		isDraggingThumbRef.current = false;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
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
						onPointerDown={handleThumbPointerDown}
						onPointerMove={handleThumbPointerMove}
						onPointerUp={endThumbDrag}
						onPointerCancel={endThumbDrag}
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
}
