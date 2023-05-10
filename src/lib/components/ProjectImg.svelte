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

	export let img: any = '';
</script>

<div use:inview={options} on:inview_change={handleChange}>
	{#if isInView}
		<img
			src={img.data.attributes.url}
			alt={img.data.attributes.alternativeText ? img.data.attributes.alternativeText : ''}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
</div>
