import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "鈴奈咲桜的Blog",
	subtitle: "愛することを忘れないで",
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 360, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // 调色盘 - 设为true将隐藏调色盘按钮
	},
	banner: {
		enable: false,
		src: "https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMtaJM8e7A4OgUw5-hCnRDVI_mepDwAAgbDMRuumphUVY30OvaB8AUBAAMCAAN5AAM2BA.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "空色天絵/釧路の空", // 要显示的信用文本
			url: "https://www.pixiv.net/artworks/128919932", // （可选）URL链接到原始艺术品或艺术家页面
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		//  {
		//    src: 'https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMdaIHX_aHsr1X_9GiRn-9TUX5aYwkAAsnDMRteRxBUTGISgB24Hx8BAAMCAAN4AAM2BA.png',    // Path of the favicon, relative to the /public directory
		//    theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//    sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		//  }
	],
	announcement: {
		enable: true,
		content: [
			"欢迎来到我的博客～ 站点持续优化中，欢迎反馈建议！",
			"学业繁忙，本站随缘打理，欢迎理解与支持。",
			"本站内容仅供学习交流，一切风险皆由用户承担。",
			"精选文章已搬运至文章>精选，欢迎访问！",
		],
		intervalSeconds: 5,
	},
	customCursor: {
		enable: false, // 设置为 false 可禁用自定义鼠标样式
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		{
			name: "文章",
			url: "/", // not used when children exist
			children: [
				{
					name: "精选",
					url: "featured/",
					external: false,
				},
				{
					name: "归档",
					url: "archive/",
					external: false,
				},
				{
					name: "系列",
					url: "series/",
					external: false,
				},
			],
		},
		LinkPreset.About,
		{
			name: "设备",
			url: "devices/",
			external: false,
		},
		{
			name: "友链",
			url: "friends/", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "赞助",
			url: "zanzhu/", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "开往",
			url: "https://www.travellings.cn/go.html",
			external: true,
		},
		// {
		// 	name: "GitHub",
		// 	url: "https://github.com/Hakutyan-bai", // Internal links should not include the base path, as it is automatically added
		// 	external: true, // Show an external link icon and will open in a new tab
		// },
		{
			name: "状态",
			url: "/", // not used when children exist
			children: [
				{
					name: "UpTime",
					url: "https://jk.skura.me/", // uptimekuma
					external: true,
				},
				{
					name: "xuguo",
					url: "https://jk.sakura.ink/status/", // xuguo
					external: true,
				},
			],
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "鈴奈咲桜",
	bio: "愛することを忘れないで",
	links: [
		{
			name: "BILIBILI",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/650530593",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Hakutyan-bai",
		},
		{
			name: "Mail",
			icon: "fa6-solid:envelope",
			url: "mailto:i@sakura.ink",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
