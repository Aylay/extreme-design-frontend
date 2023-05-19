import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const uniquenessResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/uniqueness?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const uniquenessData = await uniquenessResponse.json();
	const content = uniquenessData.data ? uniquenessData.data.attributes : '';

	const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/uniqueness?locale=all', {
		method: 'GET'
	});
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent
	};
}) satisfies PageServerData;
