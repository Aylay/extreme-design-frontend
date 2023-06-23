import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch, params }) => {
	const { actualLang } = await parent();

	const articleResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL +
			'/api/articles/' +
			params.slug +
			'?populate=deep&locale=' +
			actualLang,
		{
			method: 'GET'
		}
	);
	const articleData = await articleResponse.json();
	const content = articleData.data ? articleData.data.attributes : '';
	const articleRedirect = articleData.data ? false : true;

	const allLangResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/articles?locale=all&filters[slug][$eq]=' + params.slug,
		{
			method: 'GET'
		}
	);
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent,
		articleRedirect
	};
}) satisfies PageServerData;
