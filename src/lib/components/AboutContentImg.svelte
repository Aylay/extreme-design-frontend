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

	import Cta from './common/CTA.svelte';

	export let content: any = {};
</script>

<div
	class="flex justify-between gap-[16px] pb-[56px] max-lg:flex-col max-lg:px-[16px] lg:gap-[48px] lg:pb-[96px]"
>
	<div class="flex-1 max-lg:order-2 lg:pl-[48px]">
		<div class="gap-8px flex flex-col lg:gap-[24px]">
			<p class="text-[32px] font-medium lg:text-medium">
				{content.subtitle}
			</p>
			<h3 class="text-[64px] font-bold leading-[60px] -tracking-[0.03em] lg:text-big">
				{@html content.title}
			</h3>
		</div>
		<div class="mt-[56px] flex lg:mt-[48px]">
			<Cta cta={content.cta} />
		</div>
	</div>
	<div class="flex-1 max-lg:order-1" use:inview={options} on:inview_change={handleChange}>
		{#if isInView}
			<img
				src={content.img.data.attributes.url}
				alt={content.img.data.attributes.alternativeText
					? content.img.data.attributes.alternativeText
					: content.title}
				class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
	</div>
</div>
