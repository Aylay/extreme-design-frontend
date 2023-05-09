<script lang="ts">
	import OneProject from '$lib/components/OneProject.svelte';
import ContactUs from '$lib/components/common/ContactUs.svelte';

	const projectsList: Array<any> = [
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			}
	];
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-[56px] mt-[96px] lg:mt-[112px] lg:gap-x-[48px] lg:gap-y-[96px] pb-[56px] lg:pb-[96px] px-[16px] lg:px-[48px]">
	{#each projectsList as project}
		<OneProject {project} />
	{/each}
</div>

<ContactUs />