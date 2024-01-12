import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();

	const aboutResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/formation?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const aboutData = await aboutResponse.json();
	let content = ''
	let contentContact = ''
	let allLangsContent;

	if (aboutData.data) {
		content = aboutData.data.attributes;

		const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/about?locale=all', {
			method: 'GET'
		});
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
	}


	return {
		content,
		allLangsContent,
		contentContact
	};
}) satisfies PageServerData;
