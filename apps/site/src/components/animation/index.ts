export const lightShake = {
	animate: { rotate: [-20, 20] },
	transition: {
		rotate: {
			repeat: Infinity,
			duration: 3,
			repeatType: "mirror",
		},
	},
};

export const quickShake = {
	animate: { rotate: [-20, 20] },
	transition: {
		rotate: {
			repeat: Infinity,
			duration: 0.1,
			repeatDelay: 1,
			repeatType: "mirror",
		},
	},
};

export const fastShake = {
	animate: { rotate: [-20, 20] },
	transition: {
		rotate: {
			repeat: Infinity,
			duration: 0.001,
			repeatDelay: 1,
			repeatType: "mirror",
		},
	},
};

export const leftWindowEntry = {
	hidden: { x: "-200px", opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 90,
			damping: 14,
		},
	},
};

export const rightWindowEntry = {
	hidden: { x: "200px", opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 90,
			damping: 14,
		},
	},
};

export const bottomWindowEntry = {
	hidden: { y: "200px", opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 90,
			damping: 14,
		},
	},
};

export const fastBottomWindowEntry = {
	hidden: { y: "400px", opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 20,
		},
	},
};
