<script lang="ts">
	import { inview } from 'svelte-inview';
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

	import Cta from './common/CTA.svelte';

	export let title: string;
	export let text: string;
	export let cta: any = {};
	export let img: any = {};
	export let reverse: boolean = false;
</script>

<div
	class="flex justify-between gap-[16px] pb-[56px] max-lg:flex-col max-lg:px-[16px] lg:gap-[48px] lg:pb-[96px]"
>
	<div class="flex-1 max-lg:order-2 {reverse ? 'lg:order-2 lg:pr-[48px]' : 'lg:pl-[48px]'}">
		<div class="gap-[8px] flex flex-col lg:gap-[24px]">
			{#if text !== ''}
				<p class="text-[64px] font-bold leading-[60px] -tracking-[0.03em] lg:text-big">
					{text}
				</p>
			{/if}
			{#if title !== ''}
				<h3 class="max-lg:text-m2 lg:text-medium">
					{@html title}
				</h3>
			{/if}
		</div>
		{#if cta && cta.slug !== ''}
			<div class="mt-[56px] flex lg:mt-[48px]">
				<Cta {cta} />
			</div>
		{/if}
	</div>

	{#if img && img.data}
		<div class="flex-1 max-lg:order-1 {reverse ? 'lg:order-1' : ''}" use:inview={options} on:inview_change={handleChange}>
			{#if isInView}
				{#if img.data.attributes.mime.includes('image')}
					<img
						src={strapiURL + img.data.attributes.url}
						alt={img.data.attributes.alternativeText ? img.data.attributes.alternativeText : title}
						class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
					/>
				{/if}
				{#if img.data.attributes.mime.includes('video')}
				<video
					class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
					loop
					muted
					id="video"
					preload="metadata"
					playsinline
					autoplay
					controls={false}
					src={strapiURL + img.data.attributes.url}
				>
					<source
						src={strapiURL + img.data.attributes.url}
						type="video/mp4"
					/>
				</video>
				{/if}
			{/if}
		</div>
	{/if}
</div>
