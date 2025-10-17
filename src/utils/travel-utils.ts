export function calculateTravelDays(startDate: Date, endDate: Date): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const msPerDay = 1000 * 60 * 60 * 24;
	const diff = Math.max(0, end.getTime() - start.getTime());
	return Math.floor(diff / msPerDay) + 1;
}

export function formatTravelDateRange(startDate: Date, endDate: Date): string {
	const formatter = new Intl.DateTimeFormat("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	const start = formatter.format(startDate);
	const end = formatter.format(endDate);
	return start === end ? start : `${start} ~ ${end}`;
}
