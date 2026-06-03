import Button from "react-bootstrap/Button";
import StickerPosition from "@/components/Sticker/StickerPosition";
import { HeartSticker } from "@/components/Sticker/Stickers";

import styles from "./ApplyButton.module.scss";

const ApplyButton = () => {
	return (
		<StickerPosition
			stickers={[
				{
					Node: HeartSticker,
					positionX: "right",
					positionY: "bottom",
					offsetX: 50,
					offsetY: 50,
				},
			]}
		>
			<Button
				className={styles.applyButton}
				href="/apply"
				variant=""
				target="_blank"
				disabled
			>
				<span>Applications have closed!</span>
			</Button>
		</StickerPosition>
	);
};

export default ApplyButton;
