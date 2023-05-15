import type { PageServerData } from './$types';

export const load = (async ({ fetch }) => {
	const homeResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/home?populate=deep&locale=fr',
		{
			method: 'GET'
		}
	);
	const homeData = await homeResponse.json();
	const content = homeData.data ? homeData.data.attributes : '';

	return {
		content
	};
}) satisfies PageServerData;
