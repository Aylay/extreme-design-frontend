import type { PageServerData } from '../$types';

export const load = (async () => {
	const imageHeader = false

	return {
		imageHeader
	};
}) satisfies PageServerData;
