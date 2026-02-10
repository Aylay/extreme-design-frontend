<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
  import ImageComparison from 'svelte-image-comparison';

	export let imgs: Array<any> = [];

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

{#if imgs.length > 0}
	<div class="w-full" use:inview={options} on:inview_change={handleChange}>
		<ImageComparison class="w-full rounded-[2.2rem] overflow-hidden {isInView ? 'animate-fade' : 'opacity-0'}">
      <img src={strapiURL + imgs[0].attributes.url} alt={imgs[0].attributes.alternativeText ? imgs[0].attributes.alternativeText : ''} slot="left" class="w-full h-auto" />
      <img src={strapiURL + imgs[1].attributes.url} alt={imgs[1].attributes.alternativeText ? imgs[1].attributes.alternativeText : ''} slot="right" class="w-full h-auto" />
    </ImageComparison>
	</div>
{/if}
