function convertTime(start: Date, end: Date) {
	let startHour = ((start.getHours() + 11) % 12) + 1;
	let endHour = ((end.getHours() + 11) % 12) + 1;

	let startStr = `${startHour.toString()}:${start.getMinutes().toString().padStart(2, "0")}`;
	let endStr = `${endHour.toString()}:${end.getMinutes().toString().padStart(2, "0")}`;
	let suffix = end.getHours() <= 11 ? "am" : "pm";
	let prefix = "";

	if (start.getHours() == 11 && end.getHours() > 11) prefix = "am";
	if (start.getHours() == 23 && end.getHours() <= 11) prefix = "pm";

	if (start.getTime() == end.getTime()) return `${endStr}${suffix}`;
	return `${startStr}${prefix}-${endStr}${suffix}`;
}

export default convertTime;
