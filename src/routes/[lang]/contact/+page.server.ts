import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const contactResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/contact-us?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const contactData = await contactResponse.json();
	const content = contactData.data ? contactData.data.attributes : '';

	const allLangResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/contact-us?locale=all',
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
