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
		{#if img.attributes.mime.includes('image')}
			<img
				src={strapiURL + img.attributes.url}
				alt={img.attributes.alternativeText ? img.attributes.alternativeText : ''}
				class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if img.attributes.mime.includes('video')}
			<video
				class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
				loop
				muted
				playsinline
				autoplay
				controls={false}
				src={strapiURL + img.attributes.url}
			>
				<source src={strapiURL + img.attributes.url} type="video/mp4" />
			</video>
		{/if}
	{/if}
</div>
