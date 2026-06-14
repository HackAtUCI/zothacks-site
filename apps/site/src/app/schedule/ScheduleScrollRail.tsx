"use client";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "../schedule/ScheduleView/ScheduleView.module.scss";

const SCROLL_AMOUNT_PX = 80;
const MIN_SCROLL_INDICATOR_HEIGHT_PX = 48;

export const ScheduleScrollRail = ({ getScrollable }: { getScrollable: () => HTMLDivElement | null }) => {
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ pointerY: 0, scrollTop: 0 });
  const isDraggingThumbRef = useRef(false);
  const [scrollIndicatorPosition, setScrollIndicatorPosition] = useState({
    height: MIN_SCROLL_INDICATOR_HEIGHT_PX, offsetTop: 0,
  });
  const [hasOverflowContent, setHasOverflowContent] = useState(false);

  const updateScrollIndicatorPosition = useCallback(() => {
    const el = getScrollable();
    const track = scrollbarTrackRef.current;
    if (!el || !track) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const overflows = scrollHeight > clientHeight + 1;
    setHasOverflowContent(overflows);
    if (!overflows) {
      setScrollIndicatorPosition({ height: track.clientHeight, offsetTop: 0 });
      return;
    }
    const thumbHeight = Math.max(MIN_SCROLL_INDICATOR_HEIGHT_PX, (clientHeight / scrollHeight) * track.clientHeight);
    const maxOffset = track.clientHeight - thumbHeight;
    setScrollIndicatorPosition({
      height: thumbHeight,
      offsetTop: (scrollTop / (scrollHeight - clientHeight)) * maxOffset,
    });
  }, [getScrollable]);

  useEffect(() => {
    const el = getScrollable();
    if (!el) return;
    updateScrollIndicatorPosition();
    el.addEventListener("scroll", updateScrollIndicatorPosition);
    const observer = new ResizeObserver(updateScrollIndicatorPosition);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollIndicatorPosition);
      observer.disconnect();
    };
  }, [updateScrollIndicatorPosition, getScrollable]);

  const getScrollMetrics = useCallback(() => {
    const el = getScrollable();
    const track = scrollbarTrackRef.current;
    if (!el || !track) return null;
    const thumbHeight = Math.max(MIN_SCROLL_INDICATOR_HEIGHT_PX, (el.clientHeight / el.scrollHeight) * track.clientHeight);
    return { maxIndicatorOffset: track.clientHeight - thumbHeight, maxScrollTop: el.scrollHeight - el.clientHeight };
  }, [getScrollable]);

  const handleThumbPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!hasOverflowContent) return;
    e.preventDefault();
    dragStartRef.current = { pointerY: e.clientY, scrollTop: getScrollable()?.scrollTop ?? 0 };
    isDraggingThumbRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleThumbPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingThumbRef.current) return;
    const el = getScrollable();
    const metrics = getScrollMetrics();
    if (!el || !metrics || metrics.maxIndicatorOffset <= 0) return;
    const delta = (e.clientY - dragStartRef.current.pointerY) / metrics.maxIndicatorOffset * metrics.maxScrollTop;
    el.scrollTop = Math.min(metrics.maxScrollTop, Math.max(0, dragStartRef.current.scrollTop + delta));
  };
  const endThumbDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingThumbRef.current) return;
    isDraggingThumbRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={styles.scheduleScrollRail} aria-hidden={!hasOverflowContent}>
      <button type="button" className={styles.scheduleScrollBtnUp} tabIndex={-1}
        disabled={!hasOverflowContent}
        onClick={() => getScrollable()?.scrollBy({ top: -SCROLL_AMOUNT_PX, behavior: "smooth" })} />
      <div ref={scrollbarTrackRef} className={styles.scheduleScrollTrack}>
        <div
          className={styles.scheduleScrollThumb}
          style={{ height: `${scrollIndicatorPosition.height}px`, transform: `translateY(${scrollIndicatorPosition.offsetTop}px)` }}
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={endThumbDrag}
          onPointerCancel={endThumbDrag}
        />
      </div>
      <button type="button" className={styles.scheduleScrollBtnDown} tabIndex={-1}
        disabled={!hasOverflowContent}
        onClick={() => getScrollable()?.scrollBy({ top: SCROLL_AMOUNT_PX, behavior: "smooth" })} />
    </div>
  );
};