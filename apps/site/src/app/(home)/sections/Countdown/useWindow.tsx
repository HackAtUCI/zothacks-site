import { useEffect, useState } from "react";

export default function useWindow() {
	const [size, setSize] = useState([0, 0]);
	useEffect(() => {
		function setWindowSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		setWindowSize();
		window.addEventListener("resize", setWindowSize);
		return () => window.removeEventListener("resize", setWindowSize);
	}, []);
	return size;
}
