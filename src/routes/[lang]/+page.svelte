<script lang="ts">
	import { page } from '$app/stores';
	import HpHeader from '$lib/components/HPHeader.svelte';

	const projects = [
		{
			title: 'Schweppes',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'ccc',
						mime: 'imagesdqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		},
		{
			title: 'Monoprix',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/showreel-desktop.mp4',
						alternativeText: 'ccc',
						mime: 'videoqdsfqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		}
	];
</script>

<HpHeader {projects} />
