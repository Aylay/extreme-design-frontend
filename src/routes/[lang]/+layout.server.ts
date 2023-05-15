import type { LayoutServerData } from '../$types';

export const load = (async ({ params, route }) => {
	const activeLang = params.lang;
	const allLang = ['en', 'fr', 'pt'];
	const actualLang = !allLang.includes(activeLang) ? 'fr' : activeLang;
	const idPage = route.id;
	let restOfUrl = '';
	let redirect = false;

	if (idPage) {
		restOfUrl = idPage.substring(8);
		if (params.slug) {
			restOfUrl = restOfUrl.replace('[slug]', '') + params.slug;
		}
	}

	if (!allLang.includes(activeLang)) {
		redirect = true;
	}

	const layoutDataUrl =
		import.meta.env.VITE_STRAPI_URL + '/api/layout?populate=deep&locale=' + actualLang;

	const layoutResponse = await fetch(layoutDataUrl, {
		method: 'GET'
	});
	const layoutData = await layoutResponse.json();
	const layoutContent = layoutData.data.attributes;

	const allLangResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/layout?locale=all', {
		method: 'GET'
	});
	const allLangDataResponse = await allLangResponse.json();
	const allLangData = allLangDataResponse.data;

	return {
		actualLang,
		restOfUrl,
		redirect,
		layoutContent,
		allLangData
	};
}) satisfies LayoutServerData;
