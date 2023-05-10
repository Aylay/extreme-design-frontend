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

	export let article: any = '';
</script>

<a
	href={'/projets' + article.slug}
	title={article.title}
	class="flex flex-col gap-[16px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		<img
			src={article.img.data.attributes.url}
			alt={article.img.data.attributes.alternativeText
				? article.img.data.attributes.alternativeText
				: article.title}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
	<h3 class="text-[18px] font-medium leading-[26px] lg:text-[24px] lg:leading-[32px]">
		{article.title}
	</h3>
</a>
