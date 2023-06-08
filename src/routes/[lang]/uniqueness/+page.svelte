<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import SvelteMarkdown from 'svelte-markdown';

	import gsap from "gsap";

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;

	$: content = $page.data.content;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	let boxesContainer: any;

	onMount(() => {
		const upContent = window.innerHeight / 2 * -1;

		setTimeout(() => {
			const ctx = gsap.context(() => {
				const timeline1 = gsap.timeline({
				scrollTrigger: {
					trigger: '.title',
					start: 'top top',
					end: '+=250%',
					scrub: true,
					pin: true,
					anticipatePin: 1
				}
			})
			timeline1.to('.title p', { duration: 3, x: '-105%' })
			timeline1.to('.title', { duration: 1, opacity: 0 }, 'end')
			timeline1.to('.title p', { duration: 1, y: '-300px' }, 'end')
			timeline1.to('.content', { duration: 1, y: upContent + 'px' }, 'end')
			}, boxesContainer)
			
			return () => ctx.revert();
		}, 500);

	});
</script>

<div class="title h-screen flex justify-center items-center overflow-x-hidden">
	<div class="max-lg:pl-[16px] flex flex-nowrap gap-[26px] pl-[48px] w-full">
		<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
		<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
	</div>
</div>

<div class="content">
	<div class="mb-[56px] gap-[48px] px-[48px] max-lg:px-[16px] lg:mb-[96px] lg:grid lg:grid-cols-4">
		<div class="col-span-1 max-lg:hidden" />
		<div
			class="flex flex-col gap-[154px] text-[32px] leading-[36px] -tracking-[0.03em] lg:col-span-2 lg:gap-[112px] lg:text-[40px] lg:leading-[46px]"
		>
			<SvelteMarkdown source={content.text} options={mdOptions} />
		</div>
	</div>
	
	{#if content.img && content.img.data}
		<div class="max-lg:mb-[56px] max-lg:h-[360px]"
		use:inview={options}
		on:inview_change={handleChange}>
			<img
				src={strapiURL + content.img.data.attributes.url}
				alt={content.img.data.attributes.alternativeText
					? content.img.data.attributes.alternativeText
					: content.title}
				class="w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
					? 'animate-fade'
					: 'opacity-0'}"
			/>
		</div>
	{/if}
</div>