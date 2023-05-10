<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import ProjectImgs from '$lib/components/ProjectImgs.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import IntroH2 from '$lib/components/common/IntroH2.svelte';
	import OneProject from '$lib/components/OneProject.svelte';

	const img = {
		data: {
			attributes: {
				url: '/img/cas.jpg',
				alternativeText: 'coucou'
			}
		}
	};

	const mobileImg = {
		data: {
			attributes: {
				url: '/img/cas.jpg',
				alternativeText: 'coucou'
			}
		}
	};

	const tags = ['identite', 'print', 'design'];

	const name = 'Hedone';

	const introCta = {
		href: '/contact-us',
		title: 'Contactez-nous',
		label: 'Contactez-nous'
	};

	const imgList1: Array<any> = [
		[
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			},
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		],
		[
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		],
		[
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			},
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			},
			{
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		]
	];

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
		}
	];
</script>

<ProjectHeader {img} {tags} {name} {mobileImg} />

<IntroH2
	text="Nous avons créé Hédone, le 1er vieux rhum bio français pour révéler la rencontre d’un produit d’origine locale, magnifié par le savoir-faire de Cognac."
	cta={introCta}
/>

<ProjectImgs imgsList={imgList1} />

<div class="h-[32px] lg:h-[64px]" />

<ContactUs />

<h3
	class="px-[16px] pb-[32px] text-m1 font-medium leading-none -tracking-[0.03em] lg:px-[48px] lg:text-[40px]"
>
	Other projects
</h3>

<div
	class="grid grid-cols-1 gap-[32px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#each projectsList as project}
		<OneProject {project} />
	{/each}
</div>
