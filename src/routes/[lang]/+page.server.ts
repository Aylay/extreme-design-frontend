import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const imageHeader = true;
	const { actualLang } = await parent();

	const homeResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/home?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const homeData = await homeResponse.json();
	const content = homeData.data ? homeData.data.attributes : '';

	const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/home?locale=all', {
		method: 'GET'
	});
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		imageHeader,
		content,
		allLangsContent
	};
}) satisfies PageServerData;
