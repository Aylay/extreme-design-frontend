import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const legalResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/legal?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const legalData = await legalResponse.json();
	const content = legalData.data ? legalData.data.attributes : '';

	const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/legal?locale=all', {
		method: 'GET'
	});
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent
	};
}) satisfies PageServerData;
