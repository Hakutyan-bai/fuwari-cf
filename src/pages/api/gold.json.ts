import type { APIRoute } from "astro";

// 防止预渲染，确保每次请求都是动态的
export const prerender = false;

const API_ENDPOINT = "https://api.freejk.com/shuju/jinjia/";

export const GET: APIRoute = async () => {
	try {
		const response = await fetch(API_ENDPOINT, {
			headers: {
				accept: "application/json",
			},
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: "upstream_failed" }), {
				status: 502,
				headers: {
					"content-type": "application/json; charset=utf-8",
					"cache-control": "no-store",
				},
			});
		}

		const payload = await response.json();
		const data = payload?.data ?? {};

		const result = {
			price_text: typeof data.price_text === "string" ? data.price_text : null,
			international_price:
				typeof data.international_price === "number" ||
				typeof data.international_price === "string"
					? data.international_price
					: null,
			update_time:
				typeof data.update_time === "string" ? data.update_time : null,
		};

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "no-store",
			},
		});
	} catch (_error) {
		return new Response(JSON.stringify({ error: "network_error" }), {
			status: 502,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "no-store",
			},
		});
	}
};
