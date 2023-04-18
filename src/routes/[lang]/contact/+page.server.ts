import type { PageServerData } from '../$types';

export const load = (async ({ params, fetch }) => {
	const activeLang = params.lang;
	const allLang = ['en', 'fr', 'es'];
	const actualLang = !allLang.includes(activeLang) ? 'es' : activeLang;

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
	const allLanguesContent = allLangDataResponse.data;

	return {
		content,
		allLanguesContent
	};
}) satisfies PageServerData;
