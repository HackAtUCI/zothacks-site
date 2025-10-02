"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./PixelArt.module.scss";

// Color definitions - expanded palette with light/normal/dark variants
const COLOR_CLASSES = [
	// Row 1: Light variants
	styles.cWhite,
	styles.cRedLight,
	styles.cOrangeLight,
	styles.cYellowLight,
	styles.cGreenLight,
	styles.cBlueLight,
	styles.cIndigoLight,
	styles.cPurpleLight,
	styles.cPinkLight,
	// Row 2: Normal variants
	styles.cGray,
	styles.cRed,
	styles.cOrange,
	styles.cYellow,
	styles.cGreen,
	styles.cBlue,
	styles.cIndigo,
	styles.cPurple,
	styles.cPink,
	// Row 3: Dark variants
	styles.cBlack,
	styles.cRedDark,
	styles.cOrangeDark,
	styles.cYellowDark,
	styles.cGreenDark,
	styles.cBlueDark,
	styles.cIndigoDark,
	styles.cPurpleDark,
	styles.cPinkDark,
];

interface PixelArtProps {
	gridColors: number[];
	setGridColors: (colors: number[]) => void;
}

export default function PixelArt({ gridColors, setGridColors }: PixelArtProps) {
	const [selectedColor, setSelectedColor] = useState<number | null>(null);
	// eraser removed; always draw selected color (white index 0 clears)
	const [isDragging, setIsDragging] = useState(false);
	const clearModalRef = useRef<HTMLDialogElement | null>(null);

	const openDialog = (ref: React.RefObject<HTMLDialogElement>) =>
		ref.current?.showModal();
	const closeDialog = (ref: React.RefObject<HTMLDialogElement>) =>
		ref.current?.close();

	const clearCanvas = () => {
		setGridColors(Array(64).fill(0));
		closeDialog(clearModalRef);
	};

	const applyColor = (index: number) => {
		const next = [...gridColors];
		if (selectedColor !== null) next[index] = selectedColor; // index 0 acts as eraser
		setGridColors(next);
	};

	const handleMouseDown = (i: number) => {
		setIsDragging(true);
		applyColor(i);
	};
	const handleMouseUp = () => setIsDragging(false);
	const handleMouseEnter = (i: number) => {
		if (isDragging) applyColor(i);
	};

	useEffect(() => {
		const up = () => setIsDragging(false);
		window.addEventListener("mouseup", up);
		return () => window.removeEventListener("mouseup", up);
	}, []);

	return (
		<div
			className={`${styles.wrapper} ${isDragging ? styles.dragging : ""}`}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.preventDefault()}
		>
			<h2 className={styles.heading}>Pixel Art</h2>
			<div
				className={styles.grid}
				onMouseLeave={() => setIsDragging(false)}
				role="grid"
				aria-label="Pixel drawing grid"
			>
				{gridColors.map((colorIndex, i) => (
					<div
						key={i}
						role="gridcell"
						aria-label={`Pixel ${i + 1}`}
						className={`${styles.pixel} ${COLOR_CLASSES[colorIndex]}`}
						onMouseDown={() => handleMouseDown(i)}
						onMouseUp={handleMouseUp}
						onMouseEnter={() => handleMouseEnter(i)}
						draggable={false}
					/>
				))}
			</div>

			<div
				className={styles.palette}
				aria-label="Color palette"
				onClick={(e) => e.stopPropagation()}
			>
				{COLOR_CLASSES.map((cls, i) => {
					const isSelected = selectedColor === i;
					return (
						<button
							key={i}
							type="button"
							disabled={isDragging}
							className={`${styles.swatch} ${cls} ${isSelected ? styles.selected : ""}`}
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								if (e.button !== 0 || isDragging) return; // only primary button when not dragging
								setSelectedColor(isSelected ? null : i);
							}}
							aria-label={i === 0 ? "White (eraser)" : `Color ${i}`}
						/>
					);
				})}
			</div>

			<div className={styles.controlsRow}>
				<button
					type="button"
					className={styles.controlBtn}
					onClick={() => openDialog(clearModalRef)}
				>
					🗑️ Clear
				</button>
			</div>

			{/* Clear Modal */}
			<dialog ref={clearModalRef} className={styles.modal}>
				<div className={styles.modalBox}>
					<h3 className={styles.modalTitle}>Clear Canvas?</h3>
					<p className={styles.modalBody}>
						Are you sure you want to clear the entire canvas? This cannot be
						undone.
					</p>
					<div className={styles.modalActions}>
						<button
							type="button"
							className={styles.secondaryBtn}
							onClick={() => closeDialog(clearModalRef)}
						>
							Cancel
						</button>
						<button
							type="button"
							className={styles.dangerBtn}
							onClick={clearCanvas}
						>
							Clear
						</button>
					</div>
				</div>
			</dialog>
		</div>
	);
}
