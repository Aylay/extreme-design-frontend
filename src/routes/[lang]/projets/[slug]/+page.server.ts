import type { PageServerData } from '../$types';

export const load = (async ({ parent, fetch, params }) => {
	const imageHeader = true;
	const { actualLang } = await parent();

	const projectResponse = await fetch(
		import.meta.env.VITE_STRAPI_URL + '/api/projets/' + params.slug + '?populate=deep&locale=' + actualLang,
		{
			method: 'GET'
		}
	);
	const projectData = await projectResponse.json();
	const content = projectData.data ? projectData.data.attributes : '';
	const projectRedirect = projectData.data ? false : true;

	const allLangsContent = ''

	return {
		imageHeader,
		content,
		allLangsContent,
		projectRedirect
	};
}) satisfies PageServerData;
