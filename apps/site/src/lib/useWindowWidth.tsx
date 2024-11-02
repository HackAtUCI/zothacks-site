"use client";

import { useState, useEffect } from "react";

export default function useWindowWidth() {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	return windowWidth;
}
