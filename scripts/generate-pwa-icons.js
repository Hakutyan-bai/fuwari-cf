import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, "..");
const publicDir = join(projectRoot, "public");
const sourceCandidates = [
	join(projectRoot, "src", "assets", "images", "avatar.png"),
	join(publicDir, "favicon", "favicon-light-192.png"),
	join(publicDir, "favicon", "favicon-dark-192.png"),
];

const icons = [
	{ name: "pwa-64x64.png", size: 64 },
	{ name: "pwa-192x192.png", size: 192 },
	{ name: "pwa-512x512.png", size: 512 },
];

function pickSourceImage() {
	for (const candidate of sourceCandidates) {
		if (existsSync(candidate)) {
			return candidate;
		}
	}
	return null;
}

async function ensurePublicDir() {
	if (!existsSync(publicDir)) {
		await mkdir(publicDir, { recursive: true });
	}
}

async function generateStandardIcons(source) {
	for (const icon of icons) {
		const target = join(publicDir, icon.name);
		await sharp(source)
			.resize(icon.size, icon.size, {
				fit: "contain",
				background: { r: 255, g: 255, b: 255, alpha: 1 },
			})
			.png()
			.toFile(target);
	}
}

async function generateMaskableIcon(source) {
	const target = join(publicDir, "maskable-icon-512x512.png");
	const size = 512;
	const innerSize = Math.round(size * 0.8);
	const offset = Math.round((size - innerSize) / 2);

	const buffer = await sharp(source)
		.resize(innerSize, innerSize, {
			fit: "contain",
			background: { r: 255, g: 255, b: 255, alpha: 0 },
		})
		.png()
		.toBuffer();

	await sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		},
	})
		.composite([
			{
				input: buffer,
				top: offset,
				left: offset,
			},
		])
		.png()
		.toFile(target);
}

async function main() {
	const source = pickSourceImage();
	if (!source) {
		const message =
			"No source image found. Please add src/assets/images/avatar.png or a favicon 192x192.";
		await writeFile(
			join(projectRoot, "pwa-icon-generation.log"),
			message,
			"utf8",
		);
		console.error(message);
		process.exit(1);
	}

	await ensurePublicDir();
	await generateStandardIcons(source);
	await generateMaskableIcon(source);

	console.log("PWA icons generated successfully.");
}

main().catch((error) => {
	console.error("Failed to generate PWA icons:", error);
	process.exit(1);
});
