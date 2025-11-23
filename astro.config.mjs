import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import fuwariLinkCard from "./src/plugins/fuwari-link-card.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkModifiedTime } from "./src/plugins/remark-modified-time.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.sakura.ink/",
	base: "/",
	trailingSlash: "always",
	integrations: [
		tailwind({
			nesting: true,
		}),
		swup({
			theme: false,
			animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
			// the default value `transition-` cause transition delay
			// when the Tailwind class `transition-all` is used
			containers: ["#swup-container", "#toc", "#series-container"],
			smoothScrolling: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
		}),
		icon({
			include: {
				mdi: ["*"],
				"preprocess: vitePreprocess(),": ["*"],
				"fa6-brands": ["*"],
				"fa6-regular": ["*"],
				"fa6-solid": ["*"],
			},
		}),
		expressiveCode({
			themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.75rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
					editorTabBarBackground: "var(--codeblock-topbar-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
		svelte(),
		sitemap(),
		fuwariLinkCard({
			internalLink: { enabled: true },
		}),
		AstroPWA({
			mode:
				process.env.NODE_ENV === "development" ? "development" : "production",
			base: "/",
			scope: "/",
			includeAssets: [
				"favicon/favicon-light-32.png",
				"favicon/favicon-dark-32.png",
				"favicon/favicon-light-192.png",
				"favicon/favicon-dark-192.png",
			],
			registerType: "autoUpdate",
			disable: process.env.DISABLE_PWA === "true",
			manifest: {
				name: "鈴奈咲桜的Blog",
				short_name: "鈴奈咲桜のBlog",
				description: "愛することを忘れないで",
				start_url: "/",
				scope: "/",
				display: "standalone",
				lang: "zh-CN",
				dir: "ltr",
				background_color: "#ffffff",
				theme_color: "#ff6b9d",
				orientation: "portrait-primary",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				navigateFallback: "/offline/",
				globPatterns: ["**/*.{html,js,css,svg,png,ico,webp,woff2}"],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === "document",
						handler: "NetworkFirst",
						options: {
							cacheName: "pages",
							networkTimeoutSeconds: 10,
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: ({ request }) =>
							["style", "script", "worker"].includes(request.destination),
						handler: "StaleWhileRevalidate",
						options: {
							cacheName: "assets",
						},
					},
					{
						urlPattern: ({ request }) => request.destination === "image",
						handler: "CacheFirst",
						options: {
							cacheName: "images",
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\/$/],
				reloadPageOnUpdate: true,
			},
		}),
	],
	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkReadingTime,
			remarkExcerpt,
			remarkGithubAdmonitionsToDirectives,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
			remarkModifiedTime,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["noopener", "noreferrer"],
					filter: (url) => /^https?:\/\//.test(url),
				},
			],
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						note: (x, y) => AdmonitionComponent(x, y, "note"),
						tip: (x, y) => AdmonitionComponent(x, y, "tip"),
						important: (x, y) => AdmonitionComponent(x, y, "important"),
						caution: (x, y) => AdmonitionComponent(x, y, "caution"),
						warning: (x, y) => AdmonitionComponent(x, y, "warning"),
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
	},
	vite: {
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					// temporarily suppress this warning
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					warn(warning);
				},
			},
		},
	},
	alias: {
		"@components": "./src/components",
		"@layouts": "./src/layouts",
		"@i18n": "./src/i18n",
		"@utils": "./src/utils",
	},
});
