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
	class="flex max-lg:flex-col justify-between gap-[16px] lg:gap-[48px] pb-[56px] lg:pb-[96px] max-lg:px-[16px]"
>
	<div class="flex-1 lg:pl-[48px] max-lg:order-2">
		<div class="flex flex-col gap-8px lg:gap-[24px]">
			<p class="text-[32px] font-medium lg:text-medium">
				{content.subtitle}
			</p>
			<h3 class="text-[64px] leading-[60px] -tracking-[0.03em] font-bold lg:text-big">
				{@html content.title}
			</h3>
		</div>
		<div class="flex mt-[56px] lg:mt-[48px]">
			<Cta cta={content.cta} />
		</div>
	</div>
	<div class="flex-1 max-lg:order-1"
	use:inview={options}
	on:inview_change={handleChange}>
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
