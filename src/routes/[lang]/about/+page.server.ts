import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const aboutResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/about?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const aboutData = await aboutResponse.json();
	const content = aboutData.data ? aboutData.data.attributes : '';

	const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/about?locale=all', {
		method: 'GET'
	});
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent
	};
}) satisfies PageServerData;
