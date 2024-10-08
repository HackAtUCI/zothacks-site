import React from "react";
import { motion } from "framer-motion";

interface RippleProps {
	x: number;
	y: number;
	onComplete: () => void;
}

const Ripple: React.FC<RippleProps> = ({ x, y, onComplete }) => {
	return (
		<motion.div
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: 300,
				height: 300,
				borderRadius: "50%",
				backgroundColor: "rgba(255, 255, 255, 0.5)",
				pointerEvents: "none",
				zIndex: 1,
			}}
			initial={{ scale: 0, opacity: 1 }}
			animate={{ scale: 1, opacity: 0 }}
			transition={{ duration: 0.5 }}
			onAnimationComplete={onComplete}
		/>
	);
};

export default Ripple;
