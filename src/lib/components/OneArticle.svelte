<script lang="ts">
	import { DateTime } from "luxon";
	import { page } from '$app/stores';
	import { inview } from 'svelte-inview';
	import { onMount } from 'svelte';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let actualLang: string = $page.data.actualLang;
	let actualDate: string;

	$: actualLang = $page.data.actualLang;

	export let article: any = '';
	
	onMount(() => {
		if (!article.slug.includes('http')) {
			checkDate(article.slug)
		}
	});

	async function checkDate(slug:string) {
		const articleResponse = await fetch(import.meta.env.VITE_STRAPI_URL + '/api/articles?filters[slug][$eq]=' + slug.replace('/articles/',''), {
			method: 'GET'
		})
		const articleData = await articleResponse.json();
		const article = articleData && articleData.data && articleData.data.length > 0 ? articleData.data[0].attributes : undefined

		if (article) {
			actualDate = DateTime.fromISO(article.publishedAt).toFormat('dd LLLL yyyy', { locale: "fr" })
		}
	}
</script>

<a
	href={article.slug.includes('http') ? article.slug : '/' + actualLang + article.slug}
	title={article.title}
	target={article.slug.includes('http') ? '_blank' : ''}
	class="flex flex-col gap-[16px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		<img
			src={strapiURL + article.img.data.attributes.url}
			alt={article.img.data.attributes.alternativeText
				? article.img.data.attributes.alternativeText
				: article.title}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
	{#if actualDate}
	<p class="text-[20px] text-silver">{actualDate}</p>
	{/if}
	<h3 class="text-[18px] font-medium leading-[26px] lg:text-[24px] lg:leading-[32px]">
		{article.title}
	</h3>
</a>
