export function formatDateTime(dateTimeString) {
	// Parse the ISO 8601 string
	const date = new Date(dateTimeString);

	// Get the individual components
	const year = date.getFullYear();
	const month = date.getMonth(); // Month is zero-indexed (0 = January)
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading zero if needed
	const seconds = date.getSeconds().toString().padStart(2, "0"); // Pad seconds with leading zero if needed
	const utcOffset = date.getTimezoneOffset() / -60; // Get UTC offset in hours

	// Format the date part
	const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
		date
	);
	const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
		date
	);
	const dateString = `${weekday}, ${monthName} ${day}, ${year}`;

	// Format the time part
	const timeString = `${hours}:${minutes}:${seconds} UTC`;

	// Combine date and time with UTC offset
	return `${dateString} at ${timeString}`;
}
