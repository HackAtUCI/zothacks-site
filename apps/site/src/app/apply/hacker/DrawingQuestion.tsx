"use client";

import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import lockedIcon from "@/assets/icons/locked_drawing.png";
import pencilIcon from "@/assets/icons/pencil.png";
import eraserIcon from "@/assets/icons/erase.png";
import bucketIcon from "@/assets/icons/paint-bucket.png";
import clockIcon from "@/assets/icons/clock_icon.svg";
import brushSmallIcon from "@/assets/icons/brush-small.png";
import brushMediumIcon from "@/assets/icons/brush-medium.png";
import brushLargeIcon from "@/assets/icons/brush-large.png";
import proceedButtonImage from "@/assets/images/proceed-button.png";
import chainsImage from "@/assets/images/Chains.png";
import tutorialPeter from "@/assets/images/drawing-tutorial-peter.png";
import drawingToolsPreview from "@/assets/images/drawing-tools.png";
import peterFace from "@/assets/images/peter-face.png";

import styles from "./DrawingQuestion.module.scss";

export type DrawingTool = "pencil" | "eraser" | "bucket";

export interface DrawingCanvasHandle {
	exportDataUrl: () => string;
	undo: () => void;
}

interface DrawingCanvasProps {
	tool: DrawingTool;
	color: string;
	brushSize: number;
	initialSnapshot?: string;
	onChange?: (dataUrl: string) => void;
}

const CANVAS_WIDTH = 862;
const CANVAS_HEIGHT = 458;

const PETER_FACE_WIDTH = 352.9990234375;
const PETER_FACE_HEIGHT = 361.03472900390625;
const PETER_FACE_ANGLE_DEG = 0;
const PETER_FACE_OPACITY = 1;

const FILL_TOLERANCE = 32;

function hexToRgba(hex: string): [number, number, number, number] {
	const normalized = hex.replace("#", "");
	const r = parseInt(normalized.substring(0, 2), 16);
	const g = parseInt(normalized.substring(2, 4), 16);
	const b = parseInt(normalized.substring(4, 6), 16);
	return [r, g, b, 255];
}

function floodFill(
	imageData: ImageData,
	startX: number,
	startY: number,
	fillColor: [number, number, number, number],
) {
	const { width, height, data } = imageData;
	const startIdx = (startY * width + startX) * 4;
	const startColor: [number, number, number, number] = [
		data[startIdx],
		data[startIdx + 1],
		data[startIdx + 2],
		data[startIdx + 3],
	];

	if (
		startColor[0] === fillColor[0] &&
		startColor[1] === fillColor[1] &&
		startColor[2] === fillColor[2] &&
		startColor[3] === fillColor[3]
	) {
		return;
	}

	const matches = (idx: number) =>
		Math.abs(data[idx] - startColor[0]) <= FILL_TOLERANCE &&
		Math.abs(data[idx + 1] - startColor[1]) <= FILL_TOLERANCE &&
		Math.abs(data[idx + 2] - startColor[2]) <= FILL_TOLERANCE &&
		Math.abs(data[idx + 3] - startColor[3]) <= FILL_TOLERANCE;

	const visited = new Uint8Array(width * height);
	const stack: number[] = [];

	function tryPush(x: number, y: number) {
		if (x < 0 || x >= width || y < 0 || y >= height) return;
		const pos = y * width + x;
		if (visited[pos]) return;
		if (!matches(pos * 4)) return;
		visited[pos] = 1;
		stack.push(x, y);
	}

	tryPush(startX, startY);

	while (stack.length) {
		const y = stack.pop() as number;
		const x = stack.pop() as number;
		const idx = (y * width + x) * 4;

		data[idx] = fillColor[0];
		data[idx + 1] = fillColor[1];
		data[idx + 2] = fillColor[2];
		data[idx + 3] = fillColor[3];

		tryPush(x + 1, y);
		tryPush(x - 1, y);
		tryPush(x, y + 1);
		tryPush(x, y - 1);
	}
}

const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
	function DrawingCanvas(
		{ tool, color, brushSize, initialSnapshot, onChange },
		ref,
	) {
		const [baseImage] = useImage(peterFace.src);
		const [canvasReady, setCanvasReady] = useState(false);

		const stageRef = useRef<Konva.Stage>(null);
		const layerRef = useRef<Konva.Layer>(null);
		const canvasElRef = useRef<HTMLCanvasElement | null>(null);
		const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
		const undoStack = useRef<string[]>([]);
		const lastSnapshotRef = useRef<string | null>(null);
		const isDrawing = useRef(false);
		const hydratedRef = useRef(false);

		useEffect(() => {
			const canvas = document.createElement("canvas");
			canvas.width = CANVAS_WIDTH;
			canvas.height = CANVAS_HEIGHT;
			canvasElRef.current = canvas;
			ctxRef.current = canvas.getContext("2d");
			setCanvasReady(true);
		}, []);

		function redraw() {
			layerRef.current?.batchDraw();
		}

		function loadDataUrlOntoCanvas(dataUrl: string, after?: () => void) {
			const ctx = ctxRef.current;
			if (!ctx) return;
			const img = new window.Image();
			img.onload = () => {
				ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				redraw();
				after?.();
			};
			img.src = dataUrl;
		}

		useEffect(() => {
			if (!canvasReady || hydratedRef.current) return;

			if (initialSnapshot) {
				hydratedRef.current = true;
				loadDataUrlOntoCanvas(initialSnapshot);
				return;
			}

			if (baseImage) {
				const ctx = ctxRef.current;
				if (!ctx) return;
				hydratedRef.current = true;
				ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

				// Insert Peter's face
				const centerX = CANVAS_WIDTH / 2;
				const centerY = CANVAS_HEIGHT / 2;

				ctx.save();
				ctx.globalAlpha = PETER_FACE_OPACITY;
				ctx.translate(centerX, centerY);
				ctx.rotate((PETER_FACE_ANGLE_DEG * Math.PI) / 180);
				ctx.drawImage(
					baseImage,
					-PETER_FACE_WIDTH / 2,
					-PETER_FACE_HEIGHT / 2,
					PETER_FACE_WIDTH,
					PETER_FACE_HEIGHT,
				);
				ctx.restore();
				redraw();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [canvasReady, baseImage, initialSnapshot]);

		function emitChange() {
			const canvas = canvasElRef.current;
			if (!canvas) return;
			const dataUrl = canvas.toDataURL("image/png");
			lastSnapshotRef.current = dataUrl;
			onChange?.(dataUrl);
		}

		function pushUndoSnapshot() {
			const snapshot =
				lastSnapshotRef.current ?? canvasElRef.current?.toDataURL("image/png");
			if (snapshot) undoStack.current.push(snapshot);
		}

		function getPointerPoint() {
			const stage = stageRef.current;
			if (!stage) return null;
			return stage.getPointerPosition();
		}

		function handlePointerDown(
			event: KonvaEventObject<MouseEvent | TouchEvent>,
		) {
			event.evt.preventDefault();
			const ctx = ctxRef.current;
			const point = getPointerPoint();
			if (!ctx || !point) return;

			if (tool === "bucket") {
				pushUndoSnapshot();
				const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				floodFill(
					imageData,
					Math.floor(point.x),
					Math.floor(point.y),
					hexToRgba(color),
				);
				ctx.putImageData(imageData, 0, 0);
				redraw();
				emitChange();
				return;
			}

			pushUndoSnapshot();
			isDrawing.current = true;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = brushSize;
			ctx.globalCompositeOperation =
				tool === "eraser" ? "destination-out" : "source-over";
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(point.x, point.y);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
			redraw();
		}

		function handlePointerMove(
			event: KonvaEventObject<MouseEvent | TouchEvent>,
		) {
			if (!isDrawing.current) return;
			event.evt.preventDefault();
			const ctx = ctxRef.current;
			const point = getPointerPoint();
			if (!ctx || !point) return;

			ctx.lineTo(point.x, point.y);
			ctx.stroke();
			redraw();
		}

		function handlePointerUp() {
			if (!isDrawing.current) return;
			isDrawing.current = false;
			ctxRef.current?.closePath();
			emitChange();
		}

		useImperativeHandle(ref, () => ({
			exportDataUrl: () => canvasElRef.current?.toDataURL("image/png") ?? "",
			undo: () => {
				const previous = undoStack.current.pop();
				if (!previous) return;
				loadDataUrlOntoCanvas(previous, emitChange);
			},
		}));

		return (
			<div className={styles.stageWrapper}>
				<Stage
					ref={stageRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className={styles.stage}
					onMouseDown={handlePointerDown}
					onMouseMove={handlePointerMove}
					onMouseUp={handlePointerUp}
					onMouseLeave={handlePointerUp}
					onTouchStart={handlePointerDown}
					onTouchMove={handlePointerMove}
					onTouchEnd={handlePointerUp}
				>
					<Layer ref={layerRef}>
						{canvasReady && (
							<KonvaImage
								image={canvasElRef.current ?? undefined}
								width={CANVAS_WIDTH}
								height={CANVAS_HEIGHT}
							/>
						)}
					</Layer>
				</Stage>
			</div>
		);
	},
);

type DrawingStep =
	| "locked"
	| "tutorial"
	| "confirm"
	| "drawing"
	| "preview"
	| "done";

const DRAWING_DURATION_SECONDS = 60;
const STORAGE_KEY = "zothacks_drawing_progress";

const COLORS = [
	"#2a2a2a",
	"#ffffff",
	"#a5adbd",
	"#0082ff",
	"#ffff00",
	"#ef130b",
];

const TOOLS: { id: DrawingTool; icon: StaticImageData; label: string }[] = [
	{ id: "pencil", icon: pencilIcon, label: "Pencil" },
	{ id: "eraser", icon: eraserIcon, label: "Eraser" },
	{ id: "bucket", icon: bucketIcon, label: "Bucket fill" },
];

const BRUSH_SIZES = [2, 6, 14];

const BRUSH_SIZE_ICONS: Record<number, { src: StaticImageData; dimension: number }> = {
	2: { src: brushSmallIcon, dimension: 8 },
	6: { src: brushMediumIcon, dimension: 20 },
	14: { src: brushLargeIcon, dimension: 34 },
};

interface PersistedDrawingState {
	startTimestamp: number;
	snapshot: string;
	finalized?: boolean;
}

function loadPersistedState(): PersistedDrawingState | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (
			typeof parsed?.startTimestamp === "number" &&
			typeof parsed?.snapshot === "string"
		) {
			return parsed;
		}
	} catch {
		// ignore
	}
	return null;
}

function savePersistedState(startTimestamp: number, snapshot: string) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ startTimestamp, snapshot }),
		);
	} catch {
		// ignore
	}
}

function finalizePersistedState() {
	if (typeof window === "undefined") return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		if (
			typeof parsed?.startTimestamp !== "number" ||
			typeof parsed?.snapshot !== "string"
		) {
			return;
		}
		window.localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ ...parsed, finalized: true }),
		);
	} catch {
		// ignore
	}
}

export default function DrawingQuestion() {
	const [step, setStep] = useState<DrawingStep>("locked");
	const [tool, setTool] = useState<DrawingTool>("pencil");
	const [color, setColor] = useState(COLORS[0]);
	const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
	const [timeLeft, setTimeLeft] = useState(DRAWING_DURATION_SECONDS);
	const [initialSnapshot, setInitialSnapshot] = useState<string | undefined>(
		undefined,
	);

	const canvasRef = useRef<DrawingCanvasHandle>(null);
	const startTimestampRef = useRef<number | null>(null);

	function applyPersisted(persisted: PersistedDrawingState) {
		if (persisted.finalized) {
			setStep("done");
			return;
		}

		const elapsed = (Date.now() - persisted.startTimestamp) / 1000;
		const remaining = Math.max(0, DRAWING_DURATION_SECONDS - elapsed);

		startTimestampRef.current = persisted.startTimestamp;
		setInitialSnapshot(persisted.snapshot || undefined);
		setTimeLeft(Math.ceil(remaining));
		setStep("drawing");
	}

	useEffect(() => {
		const persisted = loadPersistedState();
		if (persisted) applyPersisted(persisted);
	}, []);

	useEffect(() => {
		if (step !== "drawing") return;

		function handleLeave() {
			finalizePersistedState();
		}

		window.addEventListener("beforeunload", handleLeave);
		window.addEventListener("pagehide", handleLeave);
		return () => {
			window.removeEventListener("beforeunload", handleLeave);
			window.removeEventListener("pagehide", handleLeave);
		};
	}, [step]);

	useEffect(() => {
		if (step !== "drawing") return;

		const interval = setInterval(() => {
			const start = startTimestampRef.current;
			if (!start) return;
			const elapsed = (Date.now() - start) / 1000;
			setTimeLeft(Math.max(0, Math.ceil(DRAWING_DURATION_SECONDS - elapsed)));
		}, 250);

		return () => clearInterval(interval);
	}, [step]);

	function handleProceedClick() {
		const persisted = loadPersistedState();
		if (persisted) {
			applyPersisted(persisted);
		} else {
			setStep("tutorial");
		}
	}

	function handleReadyToDraw() {
		const now = Date.now();
		startTimestampRef.current = now;
		setInitialSnapshot(undefined);
		setTimeLeft(DRAWING_DURATION_SECONDS);
		savePersistedState(now, "");
		setStep("drawing");
	}

	function handleTutorialStepBack() {
		setStep((current) => (current === "confirm" ? "tutorial" : "locked"));
	}

	function handleCanvasChange(dataUrl: string) {
		if (startTimestampRef.current) {
			savePersistedState(startTimestampRef.current, dataUrl);
		}
	}

	const drawingToolbar = (
		<div className={styles.drawToolbarRow}>
			<span className={styles.timerText}>
				<Image src={clockIcon} alt="" width={24} height={24} aria-hidden />{" "}
				{timeLeft}s remaining
			</span>
			<PrimaryButton
				type="button"
				variant="small"
				className={styles.submitButton}
			>
				Submit
			</PrimaryButton>
		</div>
	);

	const drawingFooter = (
		<div className={styles.drawFooterRow}>
			<div className={styles.toolGroup}>
				{TOOLS.map(({ id, icon, label }) => (
					<button
						key={id}
						type="button"
						className={styles.imageToolButton}
						aria-pressed={tool === id}
						aria-label={label}
						onClick={() => setTool(id)}
					>
						<Image
							src={icon}
							alt=""
							width={41}
							height={35}
							style={{ filter: "invert(1)" }}
							unoptimized
							aria-hidden
						/>
					</button>
				))}
			</div>

			<div className={styles.toolDivider} aria-hidden />

			<div className={styles.colorGroup}>
				<div
					className={styles.currentColorPreview}
					style={{ backgroundColor: color }}
					aria-hidden
				/>
				<div className={styles.colorSwatchGrid}>
					{COLORS.map((swatch) => (
						<button
							key={swatch}
							type="button"
							className={styles.colorSwatch}
							style={{ backgroundColor: swatch }}
							aria-pressed={color === swatch}
							aria-label={`Color ${swatch}`}
							onClick={() => setColor(swatch)}
						/>
					))}
				</div>
			</div>

			<div className={styles.toolDivider} aria-hidden />

			<div className={styles.sizeGroup}>
				{BRUSH_SIZES.map((size) => {
					const icon = BRUSH_SIZE_ICONS[size];
					return (
						<button
							key={size}
							type="button"
							className={styles.imageToolButton}
							aria-pressed={brushSize === size}
							aria-label={`Brush size ${size}`}
							onClick={() => setBrushSize(size)}
						>
							<Image
								src={icon.src}
								alt=""
								width={icon.dimension}
								height={icon.dimension}
								aria-hidden
							/>
						</button>
					);
				})}
			</div>

			<button
				type="button"
				className={styles.undoButton}
				onClick={() => canvasRef.current?.undo()}
			>
				Undo
			</button>
		</div>
	);

	return (
		<>
			<div className={styles.lockedPanel}>
				<div className={styles.lockedHeading}>
					<Image
						src={lockedIcon}
						alt=""
						className={styles.warningIcon}
						height={37}
						width={40}
						aria-hidden
					/>
					<span>Locked - Action Required</span>
				</div>

				<div className={styles.chainGraphic}>
					<Image
						src={chainsImage}
						alt=""
						fill
						className={styles.chainsImage}
						aria-hidden
					/>
					<button
						type="button"
						className={styles.proceedButton}
						onClick={handleProceedClick}
					>
						<Image
							src={proceedButtonImage}
							alt="Button to click to proceed to the locked drawing question"
							className={styles.proceedImage}
							height={113}
							width={269}
						/>
					</button>
				</div>
			</div>

			{(step === "tutorial" || step === "confirm") && (
				<div className={styles.overlay} onClick={handleTutorialStepBack}>
					<div className={styles.windowStack}>
						<div
							className={styles.tutorialLayer}
							onClick={(event) => event.stopPropagation()}
						>
							<RetroWindow title="Tutorial" onClose={handleTutorialStepBack}>
								<div className={styles.tutorialContent}>
									<Image
										src={tutorialPeter}
										alt=""
										className={styles.tutorialMascot}
										aria-hidden
										height={167}
										width={206}
									/>

									<p className={styles.tutorialText}>
										You will be given{" "}
										<span className={styles.highlight}>1 minute</span> to
										draw your current emotional state on a blank Anteater
										face. Decorate however you&apos;d like!
									</p>
									<p className={styles.tutorialText}>
										You only have{" "}
										<span className={styles.highlight}>one chance</span>, so
										decorate wisely!
									</p>

									<PrimaryButton
										type="button"
										variant="small"
										className={styles.readyButton}
										onClick={() => setStep("confirm")}
									>
										I&apos;m ready!
									</PrimaryButton>
								</div>
							</RetroWindow>
						</div>

						{step === "confirm" && (
							<div
								className={styles.confirmLayer}
								onClick={(event) => event.stopPropagation()}
							>
								<RetroWindow
									title="Like for real?"
									onClose={() => setStep("tutorial")}
								>
									<div className={styles.tutorialContent}>
										<p className={styles.tutorialText}>
											Are you actually ready?
										</p>

										<div className={styles.controlsPreview}>
											<Image
												src={drawingToolsPreview}
												alt=""
												fill
												sizes="(max-width: 750px) 100vw, 750px"
												className={styles.controlsImage}
												aria-hidden
											/>
										</div>

										<PrimaryButton
											type="button"
											variant="small"
											className={styles.readyButton}
											onClick={handleReadyToDraw}
										>
											I&apos;m really ready!
										</PrimaryButton>
									</div>
								</RetroWindow>
							</div>
						)}
					</div>
				</div>
			)}

			{step === "drawing" && (
				<div className={styles.overlay}>
					<div
						className={styles.drawWindow}
						onClick={(event) => event.stopPropagation()}
					>
						<RetroWindow
							title="Draw!"
							toolbar={drawingToolbar}
							footer={drawingFooter}
							framedContent
							contentBackground="#ffffff"
						>
							<DrawingCanvas
								ref={canvasRef}
								tool={tool}
								color={color}
								brushSize={brushSize}
								initialSnapshot={initialSnapshot}
								onChange={handleCanvasChange}
							/>
						</RetroWindow>
					</div>
				</div>
			)}

			{step === "preview" && <></>}

			{step === "done" && <></>}
		</>
	);
}
