<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import SvelteMarkdown from 'svelte-markdown';

	import OneArticle from '$lib/components/OneArticle.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let content: any;

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};

	$: {
		content = $page.data.content;
	}

	onMount(() => {
		if ($page.data.articleRedirect) {
			goto('/' + $page.data.actualLang);
		}
	});

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

</script>

<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="w-[calc(75%-16px)] lg:w-[calc(50%-24px)] lg:pr-[calc(100%/12+48px)]">
		<h1 class="max-lg:text-m1 lg:text-medium">
			{content.title}
		</h1>
	</div>
</div>

{#if content.img && content.img.data}
	<div
		class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
		use:inview={options}
		on:inview_change={handleChange}
	>
	{#if isInView}
		<img
			src={strapiURL + content.img.data.attributes.url}
			alt={content.img.data.attributes.alternativeText
				? content.img.data.attributes.alternativeText
				: content.title}
			class=" w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
				? 'animate-fade'
				: 'opacity-0'}"
			/>
	{/if}
	</div>
{/if}

{#if content.text}
<div class="mb-[56px] px-[16px] lg:mb-[96px] lg:flex lg:px-[48px]">
	<div class="content-text mx-auto lg:w-1/2">
		<SvelteMarkdown source={content.text} options={mdOptions} />
	</div>
</div>
{/if}

{#if content.otherArticlesTitle && content.otherArticlesList.length > 0}
	<div class="mb-[56px] px-[16px] lg:mb-[96px] lg:px-[48px]">
		<h3
			class="mb-[40px] text-[32px] font-medium -tracking-[0.03em] max-lg:leading-[32px] lg:text-[40px]"
		>
			{content.otherArticlesTitle}
		</h3>

		<div class="grid grid-cols-1 gap-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px]">
			{#each content.otherArticlesList as article}
				<OneArticle {article} />
			{/each}
		</div>
	</div>
{/if}
