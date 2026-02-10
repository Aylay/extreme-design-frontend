<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	export let cities: Array<any> = [];

	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<div class="lg:flex gap-[16px] lg:gap-[48px] max-lg:grid max-lg:grid-cols-2 px-[16px] lg:px-[48px] pb-[56px] lg:pb-[96px]">
	{#each cities as city}
	<div class="lg:flex-1 max-lg:col-span-1 h-[60rem] relative flex items-center justify-center p-[16px]" use:inview={options} on:inview_change={handleChange}>
		<div class="absolute w-full h-full inset-0">
			{#if isInView}
				<img
					src={strapiURL + city.img.data.attributes.url}
					alt={city.img.data.attributes.alternativeText}
					class="h-full w-full animate-fade object-cover rounded-[2.2rem] overflow-hidden"
				/>
			{/if}
		</div>
		<h3
			class="text-[10rem] text-center leading-[60px] font-black font-champ tracking-[0.05rem] relative z-10 text-white"
		>
			{city.city}
		</h3>
	</div>
	{/each}
</div>