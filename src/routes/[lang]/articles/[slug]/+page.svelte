<script lang="ts">
	import { DateTime } from "luxon";
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import OneArticle from '$lib/components/OneArticle.svelte';
	import Linkedin from '$lib/assets/svg/Linkedin.svelte'
	import Facebook from '$lib/assets/svg/Facebook.svelte'
	import Twitter from '$lib/assets/svg/Twitter.svelte'
	import WhatsApp from '$lib/assets/svg/WhatsApp.svelte'
	import ContentManager from '$lib/components/common/ContentManager.svelte';
	import LDTag from '$lib/components/utilities/LDTag.svelte'

	let content: any = $page.data.content;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	const siteURL = import.meta.env.VITE_SITE_URL

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};

	let publishedAt = DateTime.fromISO(content.publishedAt).toFormat('dd LLLL yyyy', { locale: "fr" })
	let publishedISODate = DateTime.fromISO(content.publishedAt).toISO()
	let updatedISODate = DateTime.fromISO(content.updatedAt).toISO()
	let schema: any;
	let url: string = $page.url.href
	let contentGlobal: string = '';

	$: {
		content = $page.data.content;
		publishedAt = DateTime.fromISO(content.publishedAt).toFormat('dd LLLL yyyy', { locale: "fr" })
		publishedISODate = DateTime.fromISO(content.publishedAt).toISO()
		updatedISODate = DateTime.fromISO(content.updatedAt).toISO()
		url = $page.url.href
		contentGlobal = ''

		if (content.contentManager && content.contentManager.length > 0) {
			for (const row of content.contentManager) {
				for (const column of row.colonnes) {
					if (column.titre && column.titre !== '') {
						contentGlobal += column.titre
					}
					if (column.contenu && column.contenu !== '') {
						contentGlobal += column.contenu
					}
				}
			}
		} else {
			contentGlobal = content.text
		}

		schema = {
			"@context": 'https://schema.org',
			"@type": 'BlogPosting',
			"@id": url,
			"url": url,
			"author": {
				"@type": "Organisation",
				"name": 'Extreme Design',
				"url": siteURL,
				"@id": siteURL
			},
			"datePublished": publishedISODate,
			"dateModified": updatedISODate,
			"headline": content.title.replace(/&nbsp;/g, ' '),
			"image": [
				strapiURL + content.img.data.attributes.url
			],
			"articleBody": contentGlobal,
			"text": contentGlobal,
			"inLanguage": $page.data.actualLang,
		}
	}

	onMount(() => {
		if ($page.data.articleRedirect) {
			goto('/' + $page.data.actualLang);
		}
	});
</script>

<LDTag {schema} />

<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="w-[calc(75%-16px)] lg:w-[calc(50%-24px)] lg:pr-[calc(100%/12+48px)]">
		<h1 class="max-lg:text-m1 lg:text-medium font-black font-champ tracking-[0.05rem]">
			{content.title}
		</h1>
		<p class="my-[24px] text-[20px] text-silver">{publishedAt}</p>
		{#if content.introduction && content.introduction.length > 0}
		<h2 class="text-[18px] leading-[26px] lg:text-[24px] lg:leading-[32px] mb-[24px]">
			{content.introduction}
		</h2>
		{/if}
		<div class="flex gap-[24px] items-end pt-[24px]">
			<a 
				href="https://www.linkedin.com/sharing/share-offsite/?url={url}"
				target="_blank"
				title="Partager l'article sur Linkedin"
			>
				<Linkedin newClass="w-auto h-[36px]" />
			</a>
			<a
				href="https://www.facebook.com/sharer/sharer.php?u={url}"
				target="_blank"
				title="Partager l'article sur Facebook"
			>
				<Facebook newClass="w-auto h-[36px]" />
			</a>
			<a
				href="https://twitter.com/intent/tweet?text={url}"
				target="_blank"
				title="Partager l'article sur X"
				data-size="large"
			>
				<Twitter newClass="w-auto h-[36px]" />
			</a>
			<a
				href="https://api.whatsapp.com/send?text={url}"
				target="_blank"
				title="Partager l'article sur WhatsApp"
			>
				<WhatsApp newClass="w-auto h-[36px]" />
			</a>
		</div>
	</div>
</div>

{#if content.img && content.img.data}
	<div
		class="mb-[56px] max-lg:h-[360px] lg:mb-[96px] px-[16px] lg:px-[48px]"
		use:inview={options}
		on:inview_change={handleChange}
	>
	{#if isInView}
		<img
			src={strapiURL + content.img.data.attributes.url}
			alt={content.img.data.attributes.alternativeText
				? content.img.data.attributes.alternativeText
				: content.title}
			class=" w-full max-lg:h-full max-lg:object-cover lg:h-auto rounded-[2.2rem] overflow-hidden {isInView
				? 'animate-fade'
				: 'opacity-0'}"
			/>
	{/if}
	</div>
{/if}

{#if content.contentManager && content.contentManager.length > 0}
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]">
	{#each content.contentManager as row}
		<div
			class="lg:grid max-lg:flex max-lg:flex-col gap-[56px] lg:gap-x-[48px]{row.colonnes.length === 1 ? ' justify-center' : ''}"
			style="grid-template-columns: repeat({row.colonnes.length}, minmax(0, 1fr));"
		>
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} />
			{/each}
		</div>
	{/each}
</div>

{:else}
	{#if content.text}
	<div class="mb-[56px] px-[16px] lg:mb-[96px] lg:flex lg:px-[48px]">
		<div class="content-text mx-auto lg:w-1/2">
			<SvelteMarkdown source={content.text} options={mdOptions} />
		</div>
	</div>
	{/if}
{/if}

{#if content.otherArticlesTitle && content.otherArticlesList.length > 0}
	<div class="mb-[56px] px-[16px] lg:mb-[96px] lg:px-[48px]">
		<h3
			class="mb-[40px] text-[32px] font-black font-champ tracking-[0.05rem] max-lg:leading-[32px] lg:text-[40px]"
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