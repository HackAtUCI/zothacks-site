"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { bottomWindowEntry } from "@/components/animation";

const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.4 } },
};

interface ScheduleMotionProps {
	overlay?: boolean;
	className?: string;
	children: React.ReactNode;
}

export default function ScheduleMotion({
	overlay = false,
	className,
	children,
}: ScheduleMotionProps) {
	const router = useRouter();

	useEffect(() => {
		if (!overlay) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") router.push("/", { scroll: false });
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [overlay, router]);

	return (
		<motion.div
			className={className}
			variants={overlay ? bottomWindowEntry : fadeIn}
			initial="hidden"
			animate="visible"
		>
			{children}
		</motion.div>
	);
}