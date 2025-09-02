export async function GET({ url }: { url: URL }) {
	const u = new URL(url);
	const mode = u.searchParams.get("mode") === "dark" ? "dark" : "light";
	const hParam = u.searchParams.get("h") ?? u.searchParams.get("hue");
	const hue = Number.isFinite(Number(hParam))
		? Math.max(0, Math.min(360, Math.round(Number(hParam))))
		: 360;

	const accentLight = `oklch(0.70 0.14 ${hue})`;
	const accentDark = `oklch(0.75 0.14 ${hue})`;

	const btnBgLight = `oklch(0.95 0.025 ${hue})`;
	const btnBgHoverLight = `oklch(0.90 0.05 ${hue})`;
	const btnBgActiveLight = `oklch(0.85 0.08 ${hue})`;

	const btnBgDark = `oklch(0.33 0.035 ${hue})`;
	const btnBgHoverDark = `oklch(0.38 0.04 ${hue})`;
	const btnBgActiveDark = `oklch(0.43 0.045 ${hue})`;

	const bgDark = `oklch(0.23 0.015 ${hue})`;

	const css = `:root{\n  --gsc-radius: 1rem;\n  --gsc-bg: ${mode === "dark" ? bgDark : "#ffffff"};\n  --gsc-text: ${mode === "dark" ? "#e6e6e6" : "#2a2a2a"};\n  --gsc-border: ${mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)"};\n  --gsc-accent: ${mode === "dark" ? accentDark : accentLight};\n  --gsc-muted: ${mode === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.50)"};\n  --gsc-btn-bg: ${mode === "dark" ? btnBgDark : btnBgLight};\n  --gsc-btn-bg-hover: ${mode === "dark" ? btnBgHoverDark : btnBgHoverLight};\n  --gsc-btn-bg-active: ${mode === "dark" ? btnBgActiveDark : btnBgActiveLight};\n}\n\n.giscus,\n.gsc-main,\n.gsc-timeline,\n.gsc-loading {\n  background: var(--gsc-bg) !important;\n  color: var(--gsc-text) !important;\n}\n\n.gsc-comment-box,\n.gsc-comment,\n.gsc-reply-box,\n.gsc-replies,\n.gsc-header,\n.gsc-footer,\n.gsc-timeline {\n  background: var(--gsc-bg) !important;\n  border-color: var(--gsc-border) !important;\n  border-radius: var(--gsc-radius) !important;\n}\n\n.gsc-comment-author,\n.gsc-header a,\n.gsc-comment .gsc-reactions button[aria-pressed=\"true\"] {\n  color: var(--gsc-accent) !important;\n}\n\n.gsc-comment .gsc-comment-content,\n.gsc-comment .gsc-reactions,\n.gsc-comment .gsc-replies {\n  border-color: var(--gsc-border) !important;\n}\n\nbutton,\n.gsc-button,\n.gsc-reactions button,\n.gsc-pagination-button,\n.gsc-comment-box .gsc-reply-button {\n  background: var(--gsc-btn-bg) !important;\n  color: ${mode === "dark" ? "#dddddd" : "#4a4a4a"} !important;\n  border: 1px solid var(--gsc-border) !important;\n  border-radius: calc(var(--gsc-radius) / 2) !important;\n  transition: background .2s ease, color .2s ease, border-color .2s ease;\n}\n\n.gsc-button:hover,\n.gsc-reactions button:hover,\n.gsc-pagination-button:hover,\n.gsc-comment-box .gsc-reply-button:hover {\n  background: var(--gsc-btn-bg-hover) !important;\n}\n.gsc-button:active,\n.gsc-reactions button:active,\n.gsc-pagination-button:active,\n.gsc-comment-box .gsc-reply-button:active {\n  background: var(--gsc-btn-bg-active) !important;\n}\n\n.gsc-comment-box textarea {\n  background: var(--gsc-bg) !important;\n  color: var(--gsc-text) !important;\n  border: 1px solid var(--gsc-border) !important;\n  border-radius: calc(var(--gsc-radius) / 2) !important;\n}\n\n.gsc-comment-box textarea:focus {\n  outline: none !important;\n  border-color: var(--gsc-accent) !important;\n  box-shadow: 0 0 0 1px var(--gsc-accent) !important;\n}\n\n.giscus, .gsc-main, .gsc-timeline { padding: 0 !important; }\n.gsc-comment-box, .gsc-comment, .gsc-replies { padding: 0.75rem !important; }\n.gsc-header, .gsc-footer { padding: 0.5rem 0.75rem !important; }\n`;

	return new Response(css, {
		headers: {
			"Content-Type": "text/css; charset=utf-8",
			"Cache-Control": "no-cache",
		},
	});
}
