<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import CtaArrow from '$lib/assets/svg/CTAArrow.svelte';
	import Intro from '$lib/components/common/Intro.svelte';
	import ContactForm from '$lib/components/common/ContactForm.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import Hoverable from '$lib/components/utilities/Hoverable.svelte';
	import { page } from '$app/stores';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;
	let actualLang: any;

	$: {
		actualLang = $page.data.actualLang;
		content = $page.data.content;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	let contactFormCity: any;
	let formIsOpened = false;

	function openForm(city: any) {
		contactFormCity = city;
		document.body.classList.add('overflow-hidden');
		formIsOpened = true;
	}
</script>

<div class="max-lg:hidden lg:h-[70px]" />

<Intro text={content.title} />

{#if content.location.length > 0}
	<div
		class="gap-x-[16px] gap-y-[56px] px-[16px] pb-[56px] max-lg:grid max-lg:grid-cols-2 lg:flex lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
	>
		{#each content.location as city}
			<div class="flex-1">
				<h3 class="text-[20px] font-medium leading-[24px] -tracking-[0.03em]">
					{city.city}
				</h3>
				<p class="mb-[16px] text-[20px] leading-[24px] -tracking-[0.03em] text-silver lg:mb-16">
					{@html city.adress}
				</p>
				<div class="flex cursor-pointer items-center gap-[24px]" on:click={() => openForm(city)}>
					<p class="inline-block text-[14px] font-bold uppercase leading-normal -tracking-[0.03em]">
						{city.label}
					</p>
					<CtaArrow newClass="w-[12px] h-[12px]" />
				</div>
			</div>
		{/each}
	</div>
{/if}

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

{#if content.joinUsTitle && content.joinUsList.length > 0}
	<div
		class="flex justify-between gap-[16px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
	>
		<h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">{content.joinUsTitle}</h2>
		<div class="flex flex-1 flex-col">
			{#each content.joinUsList as job}
				<div
					class="flex justify-between gap-[16px] border-b border-solid border-shark py-[32px] first:border-t lg:items-center lg:gap-[48px]"
				>
					<p class="flex-1 text-[24px] leading-tight -tracking-[0.03em]">
						{job.job}
					</p>
					<div class="flex flex-1 justify-between gap-[16px] lg:items-center lg:gap-[48px]">
						<p class="flex-1 text-[24px] leading-tight -tracking-[0.03em]">
							{job.contract}
						</p>
						<p class="text-[24px] leading-tight -tracking-[0.03em]">
							{job.location}
						</p>
					</div>
				</div>
			{/each}

			{#if content.joinUsCta}
				<div class="flex max-lg:pt-[56px] lg:pt-[96px]">
<Hoverable let:hovering={active}>
	<a
		href={content.joinUsCta.slug.includes('http') ? content.joinUsCta.slug : '/' + actualLang + content.joinUsCta.slug}
		class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
		title={content.joinUsCta.title ? content.joinUsCta.title : content.joinUsCta.label}
		target={content.joinUsCta.slug.includes('http') ? '_blank' : ''}
	>
		<div class="flex items-center gap-[24px] lg:gap-[32px]">
			<span
				class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
			>
				{content.joinUsCta.label}
			</span>
			<ArrowCta />
		</div>
		<div
			class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
				? 'w-full'
				: 'w-0'}"
		/>
	</a>
</Hoverable>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if formIsOpened}
	<ContactForm bind:isOpened={formIsOpened} city={contactFormCity} />
{/if}
