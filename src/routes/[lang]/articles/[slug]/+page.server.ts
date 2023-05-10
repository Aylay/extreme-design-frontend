import type { PageServerData } from '../$types';

export const load = (async () => {
	const imageHeader = true;

	return {
		imageHeader
	};
}) satisfies PageServerData;
