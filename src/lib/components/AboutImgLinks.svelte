<script lang="ts">
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import type City from '$lib/interface/city';
	import Hoverable from './utilities/Hoverable.svelte';

	export let cities: Array<any> = [];

	let actualCity: City;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	onMount(() => {
		setCity(cities[0], 0);
	});

	function setCity(city: any, i: number) {
		actualCity = {
			name: city.name,
			img: {
				src: city.img.data.attributes.url,
				alt: city.img.data.attributes.alternativeText
					? city.img.data.attributes.alternativeText
					: city.name
			},
			id: i
		};
	}
</script>

{#if actualCity}
	<div
		class="flex justify-between gap-[16px] pb-[56px] max-lg:flex-col max-lg:px-[16px] lg:gap-[48px] lg:pb-[96px]"
		use:inview={options}
		on:inview_change={handleChange}
	>
		<div class="flex-1" use:inview={options} on:inview_change={handleChange}>
			{#if isInView}
				<img
					src={actualCity.img.src}
					alt={actualCity.img.alt}
					class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
				/>
			{/if}
		</div>
		<div class="flex-1 lg:pr-[48px]">
			<div class="flex flex-col">
				{#each cities as city, i}
					<div class="max-lg:hidden">
						<Hoverable let:hovering={active}>
							<h3
								class="cursor-pointer text-big font-bold text-shark transition-opacity {active ||
								city.name === actualCity.name
									? 'opacity-100'
									: 'opacity-30'}"
								on:mouseenter={() => setCity(city, i)}
							>
								{city.name}
							</h3>
						</Hoverable>
					</div>
					<h3
						class="cursor-pointer text-[64px] font-bold leading-[60px] -tracking-[0.03em] text-shark transition-opacity lg:hidden {city.name ===
						actualCity.name
							? 'opacity-100'
							: 'opacity-30'}"
						on:click={() => setCity(city, i)}
					>
						{city.name}
					</h3>
				{/each}
			</div>
		</div>
	</div>
{/if}
