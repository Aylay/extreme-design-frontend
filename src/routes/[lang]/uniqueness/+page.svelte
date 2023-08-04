<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import SvelteMarkdown from 'svelte-markdown';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;
	let contentFooter: any;
	let actualLang: any;
	let y: number;

	$: {
		content = $page.data.content;
		actualLang = $page.data.actualLang;
		contentFooter = $page.data.layoutContent;
	}

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

	onMount(() => {
		const scrollContainer = document.querySelector('body');
		const uniquenessTitleContainer = document.getElementById('uniqueness-title');
		const uniquenessContentContainer = document.getElementById('uniqueness-content');

		scrollContainer.addEventListener('wheel', (evt) => {
			let yTopTitle: number;
			let yOpacity: number;

			if (y < 1130) {
				uniquenessTitleContainer.style.transform = 'translate(' + -y + 'px, 0)'
				uniquenessContentContainer.style.top = 'calc(100vh + 200px + ' + y + 'px)'
				uniquenessTitleContainer.style.opacity = '100%'
			}
			if (y >= 1130 && y < 1530) {
				yTopTitle = y - 1130;
				yOpacity = (1510 - y) / 4
				uniquenessTitleContainer.style.transform = 'translate(-1130px, ' + -yTopTitle * 0.5 + 'px)'
				uniquenessTitleContainer.style.opacity = yOpacity + '%'
			}
			if (y >= 1530) {
				uniquenessTitleContainer.style.transform = 'translate(-1130px, -200px)'
				uniquenessTitleContainer.style.opacity = '0%'
			}
		});
	})
</script>

<svelte:window bind:scrollY={y} />

<div class="relative lg:h-screen max-lg:overflow-x-hidden">
	<div class="h-[calc(60vh)] lg:h-screen flex items-center lg:fixed lg:top-0">
		<div
			class="flex flex-nowrap gap-[26px] pb-[56px] pl-[48px] pt-[90px] max-lg:pl-[16px] lg:pb-[96px] lg:pt-[232px] transition-opacity"
			id="uniqueness-title"
		>
			<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
			<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
		</div>
	</div>

	<div class="lg:absolute lg:top-full w-full"  id="uniqueness-content">
		<div class="mb-[56px] gap-[48px] px-[48px] max-lg:px-[16px] lg:mb-[96px] mx-auto max-w-[120rem]">
			<div
				class="flex flex-col gap-[154px] text-[32px] leading-[36px] -tracking-[0.03em] lg:gap-[112px] lg:text-[40px] lg:leading-[46px]"
			>
				<SvelteMarkdown source={content.text} options={mdOptions} />
			</div>
		</div>
		
		{#if content.img}
			<div
				class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
				use:inview={options}
				on:inview_change={handleChange}
			>
				{#if isInView}
					<img
						src={strapiURL + content.img.data.attributes.url}
						alt={content.img.data.attributes.alternativeText
							? content.img.data.attributes.alternativeText
							: content.title}
						class="w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
							? 'animate-fade'
							: 'opacity-0'}"
					/>
				{/if}
			</div>
		{/if}

		<div
			class="flex max-lg:flex-col justify-between px-[4.8rem] py-8 max-lg:mt-[108px] max-lg:gap-[16px] max-lg:px-[16px] lg:items-center"
			use:inview={options}
			on:inview_change={handleChange}
		>
			<div class="flex gap-4 max-lg:flex-col max-lg:gap-[8px] lg:items-center">
				<p
					class="text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em] lg:pt-2"
				>
					{contentFooter.legalText}
				</p>
				{#if isInView}
					<a href="https://extreme.fr/" target="_blank">
						<img
							src="/img/logo-extreme.jpg"
							alt="logo Extreme"
							class="h-auto w-full max-w-[10rem] {isInView ? 'animate-fade' : 'opacity-0'}"
						/>
					</a>
				{/if}
			</div>
			<ul class="flex max-lg:flex-col lg:gap-6">
				{#each contentFooter.footerMenu as item}
					<li>
						<a
							href={item.slug.includes('http') ? item.slug : '/' + actualLang + item.slug}
							target={item.slug.includes('http') ? '_blank' : ''}
							title={item.title ? item.title : item.label}
							class="text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em]"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
