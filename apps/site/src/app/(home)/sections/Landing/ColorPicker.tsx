"use client";

import Image from "next/image";
import { useState } from "react";
import paintbrush from "@/assets/icons/paintbrush.svg";
import styles from "./ColorPicker.module.scss";

const PALETTE: string[] = [
	"#808080",
	"#8D0000",
	"#808000",
	"#008200",
	"#008281",
	"#000086",
	"#8D0085",
	"#808035",
	"#004141",
	"#0082FF",
	"#FF7575",
	"#FFFF00",
	"#00FF00",
	"#00FFFF",
	"#0000FF",
	"#FF00FF",
	"#FFFF68",
	"#00FF70",
	"#FFFFFF",
	"#002248",
];

interface ColorPickerProps {
	onColorSelect?: (color: string) => void;
}

export default function ColorPicker({ onColorSelect }: ColorPickerProps) {
	const [selected, setSelected] = useState<string>();

	return (
		<div className={styles.colorPicker}>
			<div className={styles.brushCell}>
				<Image src={paintbrush} alt="Paintbrush" className={styles.brushIcon} />
			</div>

			<div className={styles.paletteFrame}>
				{PALETTE.map((color) => (
					<button
						key={color}
						type="button"
						className={styles.colorPalette}
						style={{ backgroundColor: color }}
						aria-label={color}
						aria-pressed={selected === color}
						onClick={() => {
							setSelected(color);
							onColorSelect?.(color);
						}}
					/>
				))}
			</div>
		</div>
	);
}
