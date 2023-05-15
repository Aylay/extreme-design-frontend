import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const newsResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/news-list?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const newsData = await newsResponse.json();
	const content = newsData.data ? newsData.data.attributes : '';

	const allLangResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/news-list?locale=all',
		{
			method: 'GET'
		}
	);
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent
	};
}) satisfies PageServerData;
