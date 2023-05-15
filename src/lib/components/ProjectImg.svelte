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

	export let img: any = '';
</script>

<div use:inview={options} on:inview_change={handleChange}>
	{#if isInView}
		<img
			src={strapiURL + img.attributes.url}
			alt={img.attributes.alternativeText ? img.attributes.alternativeText : ''}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
</div>
