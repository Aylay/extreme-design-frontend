<script lang="ts">
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import { register } from 'swiper/element/bundle';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import 'swiper/element/css/autoplay';

	onMount(() => {
		register();
		const swiperEl = document.querySelector('swiper-container');
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	});

	export let images: Array<any> = [];

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	const swiperParams = {
		speed: 1000,
		grabCursor: true,
		slidesPerView: 'auto',
		spaceBetween: 16,
		breakpoints: {
			640: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 48
			}
		}
	};
</script>

{#if images.length > 0}
	<div class="pb-[56px] lg:pb-[96px]" use:inview={options} on:inview_change={handleChange}>
		<swiper-container class="w-full {isInView ? 'animate-fade' : 'opacity-0'}" init={false}>
			{#each images as img}
				<swiper-slide class="max-lg:w-3/4">
					<img
						src={strapiURL + img.attributes.url}
						alt={img.attributes.alternativeText ? img.attributes.alternativeText : ''}
						class="h-auto w-full max-lg:ml-[16px]"
					/>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
{/if}
