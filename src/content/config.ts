import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		series: z.string().optional(),
		pinned: z.boolean().optional().default(false),
		// Featured posts
		featured: z.boolean().optional().default(false),
		featuredRank: z.number().optional().default(0),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const travelsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		location: z.string(),
		startDate: z.date(),
		endDate: z.date(),
		weather: z.string(),
		transportation: z.array(z.string()).default([]),
		spots: z.array(z.string()).default([]),
		cover: z.string(),
		description: z.string().optional().default(""),
		lang: z.string().optional().default("zh-CN"),
		draft: z.boolean().optional().default(false),
		gallery: z
			.array(
				z.object({
					src: z.string(),
					caption: z.string().optional(),
				}),
			)
			.optional()
			.default([]),
	}),
});

export const collections = {
	posts: postsCollection,
	travels: travelsCollection,
};
