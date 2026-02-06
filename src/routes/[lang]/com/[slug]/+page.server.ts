import type { PageServerData } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, fetch, params }) => {
	const imageHeader = false;
	const { actualLang } = await parent();

	const lpResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL +
			'/api/lps/' +
			params.slug +
			'?populate=deep&locale=' +
			actualLang,
		{
			method: 'GET'
		}
	);
	const lpData = await lpResponse.json();
	let content = ''
	let contentContact = ''
	let allLangsContent;

	if (lpData.data) {
		content = lpData.data.attributes;

		const allLangResponse = await fetch(
			import.meta.env.VITE_STRAPI_URL + '/api/lps?locale=all&filters[slug][$eq]=' + params.slug,
			{
				method: 'GET'
			}
		);
		const allLangDataResponse = await allLangResponse.json();
		allLangsContent = allLangDataResponse.data;

		const contactResponse = await fetch(
			import.meta.env.VITE_STRAPI_URL + '/api/contact-us?populate=deep&locale=' + actualLang,
			{
				method: 'GET'
			}
		);
		const contactData = await contactResponse.json();
		contentContact = contactData.data ? contactData.data.attributes : '';
	} else {
		redirect(307, '/' + actualLang);
	}

	return {
		imageHeader,
		content,
		allLangsContent,
		contentContact
	};
}) satisfies PageServerData;
