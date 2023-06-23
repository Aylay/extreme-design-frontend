import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch, params }) => {
	const imageHeader = true;
	const { actualLang } = await parent();

	const projectResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL +
			'/api/projets/' +
			params.slug +
			'?populate=deep&locale=' +
			actualLang,
		{
			method: 'GET'
		}
	);
	const projectData = await projectResponse.json();
	const content = projectData.data ? projectData.data.attributes : '';
	const projectRedirect = projectData.data ? false : true;

	const allLangResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/projets?locale=all&filters[slug][$eq]=' + params.slug,
		{
			method: 'GET'
		}
	);
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		imageHeader,
		content,
		allLangsContent,
		projectRedirect
	};
}) satisfies PageServerData;
