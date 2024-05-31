import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { actualLang } = await parent();
	
	const projectsResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/projects-list?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const projectsData = await projectsResponse.json();
	const content = projectsData.data ? projectsData.data.attributes : '';
	
	const imageHeader = !!(content.mainMediaDesktop && content.mainMediaDesktop.data && content.mainMediaMobile && content.mainMediaMobile.data);
	
	const allLangResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/projects-list?locale=all',
		{
			method: 'GET'
		}
	);
	const allLangDataResponse = await allLangResponse.json();
	const allLangsContent = allLangDataResponse.data;

	return {
		content,
		allLangsContent,
		imageHeader
	};
}) satisfies PageServerData;
