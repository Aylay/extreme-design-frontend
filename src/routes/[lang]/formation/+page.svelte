<script lang="ts">
	import { inview } from 'svelte-inview';
	import { page } from '$app/stores';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import Intro from '$lib/components/common/Intro.svelte';
	import ContentManager from '$lib/components/common/ContentManager.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import Hoverable from '$lib/components/utilities/Hoverable.svelte';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any = $page.data.content;
	let actualLang: any;

	$: {
		content = $page.data.content;
		actualLang = $page.data.actualLang;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<div class="max-lg:hidden lg:h-[70px]" />

<Intro text={content.title} />

<div
	class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		{#if content.media.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + content.media.data.attributes.url}
				alt={content.media.data.attributes.alternativeText
					? content.media.data.attributes.alternativeText
					: content.title}
				class="h-auto w-full max-lg:hidden {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if content.mediaMobile.data && content.mediaMobile.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + content.mediaMobile.data.attributes.url}
				alt={content.mediaMobile.data.attributes.alternativeText
					? content.mediaMobile.data.attributes.alternativeText
					: content.title}
				class=" h-full w-full object-cover lg:hidden {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if content.media.data.attributes.mime.includes('video')}
			<video
				class="h-auto w-full max-lg:hidden"
				loop
				muted
				id="video"
				preload="metadata"
				playsinline
				autoplay
				controls={false}
				src={strapiURL + content.media.data.attributes.url}
			>
				<source
					src={strapiURL + content.media.data.attributes.url}
					type="video/mp4"
					media="(min-width: 1024px)"
				/>
			</video>
		{/if}
		{#if content.mediaMobile.data && content.mediaMobile.data.attributes.mime.includes('video')}
			<video
				class="h-full w-full object-cover lg:hidden"
				loop
				muted
				id="video"
				preload="metadata"
				playsinline
				autoplay
				controls={false}
				src={strapiURL + content.mediaMobile.data.attributes.url}
			>
				<source
					src={strapiURL + content.mediaMobile.data.attributes.url}
					type="video/mp4"
					media="(max-width: 1023px)"
				/>
			</video>
		{/if}
	{/if}
</div>

{#if content.contentManager.length > 0}
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]">
	{#each content.contentManager as row}
		<div class="flex max-lg:flex-col gap-[56px] lg:gap-x-[48px] {row.colonnes.length === 1 ? 'justify-center' : ''}">
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} formation={true} />
			{/each}
		</div>
	{/each}
</div>
{/if}

{#if content.objectifs && content.objectifs.length > 0}
<div
	class="gap-x-[16px] gap-y-[56px] px-[16px] pb-[56px] grid grid-cols-5 max-lg:grid-cols-2 lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#each content.objectifs as goal, i}
		<div>
			<p class="text-m1">
				{i + 1}
			</p>
			<p class="text-[20px] leading-[24px] -tracking-[0.03em] text-silver text-justify">
				{goal.text}
			</p>
		</div>
	{/each}
</div>
{/if}

{#if content.titreDuree && content.textsDuree && content.textsDuree.length > 0}
<div
class="flex justify-between gap-[16px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	<h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">{content.titreDuree}</h2>
	<div class="flex-1 flex flex-col">
		{#each content.textsDuree as text}
			<p class="border-b border-solid border-shark py-[32px] first:border-t text-[24px] leading-tight -tracking-[0.03em]">
				{text.text}
			</p>
		{/each}
	</div>
</div>
{/if}

{#if content.contentManager2.length > 0}
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]">
	{#each content.contentManager2 as row}
		<div class="flex max-lg:flex-col gap-[56px] lg:gap-x-[48px] {row.colonnes.length === 1 ? 'justify-center' : ''}">
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} formation={true} />
			{/each}
		</div>
	{/each}
</div>
{/if}

{#if content.downloadTitle || (content.downloads && content.downloads.length > 0)}
<div class="flex flex-col px-[16px] pb-[56px] lg:px-[48px] lg:pb-[96px]">
	{#if content.downloadTitle}
	<p class="max-lg:text-m1 lg:text-medium lg:font-medium mb-[32px]">
		{content.downloadTitle}
	</p>
	{/if}
	{#if content.downloads && content.downloads.length > 0}
	<div class="flex max-lg:flex-col gap-[24px] lg:gap-[32px]">
		{#each content.downloads as download}
			<div>
				<Hoverable let:hovering={active}>
					<a
						href={download.slug.includes('http') ? download.slug : '/' + actualLang + download.slug}
						class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
						title={download.title ? download.title : download.label}
						target={download.slug.includes('http') ? '_blank' : ''}
					>
						<div class="flex items-center gap-[24px] lg:gap-[32px]">
							<span
								class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
							>
								{download.label}
							</span>
							<ArrowCta />
						</div>
						<div
							class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
								? 'w-0'
								: 'w-full'}"
						/>
					</a>
				</Hoverable>
			</div>
		{/each}
	</div>
	{/if}
</div>
{/if}

{#if content.contentManager3.length > 0}
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]">
	{#each content.contentManager3 as row}
		<div class="flex max-lg:flex-col gap-[56px] lg:gap-x-[48px] {row.colonnes.length === 1 ? 'justify-center' : ''}">
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} formation={true} />
			{/each}
		</div>
	{/each}
</div>
{/if}