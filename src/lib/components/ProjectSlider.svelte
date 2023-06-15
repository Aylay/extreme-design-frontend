<script lang="ts">
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import { register } from 'swiper/element/bundle';
	import { Navigation, Pagination } from 'swiper';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import 'swiper/element/css/autoplay';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';

	onMount(() => {
		register();
		const swiperEl = document.querySelector('swiper-container');
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	});

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

	const swiperParams = {
		modules: [Navigation, Pagination],
		speed: 1000,
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.swiper-next',
    	prevEl: '.swiper-prev',
		},
		pagination: {
			hideOnClick: false,
			clickable: true
    },
		autoplay: true
	};
</script>

{#if imgs.length > 0}
	<div class="w-full relative" use:inview={options} on:inview_change={handleChange}>
		<swiper-container class="w-full {isInView ? 'animate-fade' : 'opacity-0'}" init={false}>
			{#each imgs as img}
				<swiper-slide>
					<img
						src={strapiURL + img.attributes.url}
						alt={img.attributes.alternativeText ? img.attributes.alternativeText : ''}
						class="h-auto w-full"
					/>
				</swiper-slide>
			{/each}
		</swiper-container>
		<div class="swiper-prev absolute top-1/2 transform -translate-y-1/2 left-[24px] z-20">
			<ArrowCta newClass="transform rotate-[-135deg] stroke-white w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]" />
		</div>
		
		<div class="swiper-next absolute top-1/2 transform -translate-y-1/2 right-[24px] z-20">
			<ArrowCta newClass="transform rotate-45 stroke-white w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]" />
		</div>
	</div>
{/if}

<style>
	:root {
		--swiper-theme-color: #fff;
		--swiper-pagination-bullet-border-radius: 0;
		--swiper-pagination-bullet-inactive-opacity: 1;
		--swiper-navigation-sides-offset: 24px;
		--swiper-pagination-bottom: 24px;
		--swiper-pagination-bullet-width: 12px;
		--swiper-pagination-bullet-height: 12px;
		--swiper-pagination-bullet-horizontal-gap: 6px;
	}
</style>