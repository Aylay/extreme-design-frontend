<script lang="ts">
	import OneArticle from '$lib/components/OneArticle.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';

	const newsList: Array<any> = [
		{
			title: 'Sophie Grenier de Warrens dirige le pôle conseil d’Extreme !',
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

<div
	class="mt-[96px] grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:mt-[112px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]"
>
	{#each newsList as article}
		<OneArticle {article} />
	{/each}
</div>

<ContactUs />
