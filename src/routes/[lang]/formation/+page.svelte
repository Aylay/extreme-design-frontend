<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import Intro from '$lib/components/common/Intro.svelte';
	import ContentManager from '$lib/components/common/ContentManager.svelte';
	import LpForm from '$lib/components/common/LPForm.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import Hoverable from '$lib/components/utilities/Hoverable.svelte';
	import { page } from '$app/stores';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any = $page.data.content;
	let formIsOpened = false;

	$: {
		content = $page.data.content;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	function openForm() {
		document.body.classList.add('overflow-hidden');
		formIsOpened = true;
	}
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
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px] {!content.title || content.title === '' ? 'pt-[56px] lg:pt-[96px]' : ''}">
	{#each content.contentManager as row}
		<div class="flex max-lg:flex-col gap-[56px] lg:gap-x-[48px] {row.colonnes.length === 1 ? 'justify-center' : ''}">
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} />
			{/each}
		</div>
	{/each}
</div>
{/if}

{#if content.contact}
<div class="flex px-[16px] pb-[56px] lg:px-[48px] lg:pb-[96px]">
	<Hoverable let:hovering={active}>
		<button
			class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
			on:click={() => openForm()}
		>
			<div class="flex items-center gap-[24px] lg:gap-[32px]">
				<span
				class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
				>
				{content.contactLabel}
			</span>
			<ArrowCta />
		</div>
		<div
		class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
			? 'w-0'
			: 'w-full'}"
			/>
		</button>
	</Hoverable>
</div>
{/if}

{#if formIsOpened}
	<LpForm bind:isOpened={formIsOpened} />
{/if}