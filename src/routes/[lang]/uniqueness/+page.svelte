<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import SvelteMarkdown from 'svelte-markdown';

	import { page } from '$app/stores';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;

	$: {
		content = $page.data.content;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<div
	class="flex flex-nowrap gap-[26px] overflow-hidden pb-[56px] pl-[48px] pt-[90px] max-lg:pl-[16px] lg:pb-[96px] lg:pt-[232px]"
>
	<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
	<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
	<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
	<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
</div>

{#if content.img}
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
				class="w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
					? 'animate-fade'
					: 'opacity-0'}"
			/>
		{/if}
	</div>
{/if}

<div class="mb-[56px] gap-[48px] px-[48px] max-lg:px-[16px] lg:mb-[96px] lg:grid lg:grid-cols-12">
	<div class="col-span-3 max-lg:hidden" />
	<div
		class="flex flex-col gap-[154px] text-[32px] leading-[36px] -tracking-[0.03em] lg:col-span-5 lg:gap-[112px] lg:text-[40px] lg:leading-[46px]"
	>
		<SvelteMarkdown source={content.text} options={mdOptions} />
	</div>
</div>
