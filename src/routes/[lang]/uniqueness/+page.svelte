<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

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

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>


<div class="relative px-[16px] lg:px-[48px]">
	{#if content.img}
		<div
			use:inview={options}
			on:inview_change={handleChange}
		>
			{#if isInView}
				<img
					src={strapiURL + content.img.data.attributes.url}
					alt={content.img.data.attributes.alternativeText
						? content.img.data.attributes.alternativeText
						: content.title}
					class="w-full rounded-[2.2rem] overflow-hidden h-auto {isInView
						? 'animate-fade'
						: 'opacity-0'}"
				/>
			{/if}
		</div>
	{/if}
</div>
