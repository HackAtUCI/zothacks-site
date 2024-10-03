import { useEffect, useState } from "react";

export default function useWindow() {
	const [size, setSize] = useState([0, 0]);
	useEffect(() => {
		setSize([window.innerWidth, window.innerHeight]);
		function setWindowSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", setWindowSize);
		return () => window.removeEventListener("resize", setWindowSize);
	}, []);
	return size;
}
