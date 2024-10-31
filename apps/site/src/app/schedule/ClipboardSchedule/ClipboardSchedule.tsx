"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { cubicBezier, motion, Variants } from "framer-motion";
import { toZonedTime } from "date-fns-tz";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import clip from "@/assets/images/clip.svg";

import styles from "./ClipboardSchedule.module.scss";
import Countdown from "./Countdown";

const dateTimeFormat = new Intl.DateTimeFormat("en", {
	hour: "numeric",
	minute: "numeric",
});

const monthDayFormat = new Intl.DateTimeFormat("en", {
	month: "long",
	day: "numeric",
});

const weekdayFormat = new Intl.DateTimeFormat("en", {
	weekday: "long",
});

const variant: Variants = {
	initial: {
		y: 200,
		transformOrigin: "top center",
		rotateX: 20,
	},
	animate: {
		y: 0,
		rotateX: 0,
		transition: {
			duration: 0.7,
			ease: cubicBezier(0.85, 0, 0.15, 1),
		},
	},
};

interface ClipboardScheduleProps {
	schedule: {
		title: string;
		location?: string | undefined;
		virtual?: string | undefined;
		startTime: Date;
		endTime: Date;
		organization?: string | undefined;
		hosts?: string[] | undefined;
		description: JSX.Element;
	}[][];
}

// 10/4/23 10AM in UTC
const hackingStarts = new Date(Date.UTC(2023, 10, 4, 17, 0, 0));
const hackingEnds = new Date(Date.UTC(2023, 10, 5, 5, 0, 0));

const ClipboardSchedule: React.FC<ClipboardScheduleProps> = ({ schedule }) => {
	const { width, height } = useWindowSize();
	const [currDate, setCurrDate] = useState(new Date());

	useEffect(() => {
		const timeUpdater = setInterval(() => setCurrDate(new Date()), 1000);
		return () => clearInterval(timeUpdater || undefined);
	}, []);

	return <></>;
};

export default ClipboardSchedule;
