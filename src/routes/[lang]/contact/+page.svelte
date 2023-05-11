<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import CtaArrow from '$lib/assets/svg/CTAArrow.svelte';
	import Intro from '$lib/components/common/Intro.svelte';
	import Cta from '$lib/components/common/CTA.svelte';
	import ContactForm from '$lib/components/common/ContactForm.svelte';

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

	const cities = [
		{
			id: 1,
			name: 'Paris',
			text: '92-98 Boulevard Victor Hugo - A2<br />92115 Clichy<br />France<br />T – 0140998050'
		},
		{
			id: 1,
			name: 'Lyon',
			text: '92-98 Boulevard Victor Hugo - A2<br />92115 Clichy<br />France<br />T – 0140998050'
		},
		{
			id: 1,
			name: 'London',
			text: '92-98 Boulevard Victor Hugo - A2<br />92115 Clichy<br />France<br />T – 0140998050'
		},
		{
			id: 1,
			name: 'Sāo Polo',
			text: '92-98 Boulevard Victor Hugo - A2<br />92115 Clichy<br />France<br />T – 0140998050'
		}
	];

	const jobs = [
		{
			title: 'Directeur Artistique',
			type: 'CDD',
			ville: 'Paris'
		},
		{
			title: 'Stagiaire chef de projet',
			type: 'Stage',
			ville: 'London'
		},
		{
			title: 'Cheffe de projet',
			type: 'CDI',
			ville: 'Paris'
		},
		{
			title: 'Directeur Artistique',
			type: 'CDD',
			ville: 'Paris'
		}
	];

	const cta = {
		href: 'https://beavers-agency.fr',
		title: 'Toutes les offres du groupe',
		label: 'Toutes les offres du groupe'
	};

	function openForm(city: any) {
		contactFormCity = city;
    document.body.classList.add('overflow-hidden')
		formIsOpened = true;
	}
</script>

<div class="h-[56px] lg:h-[96px]" />

<Intro text="Bonjour<br />Hello<br />Bom Dia" />

<div
	class="gap-x-[16px] gap-y-[56px] px-[16px] pb-[56px] max-lg:grid max-lg:grid-cols-2 lg:flex lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#each cities as city}
		<div class="flex-1">
			<h3 class="text-[20px] font-medium leading-[24px] -tracking-[0.03em]">
				{city.name}
			</h3>
			<p class="mb-[16px] text-[20px] leading-[24px] -tracking-[0.03em] text-silver lg:mb-16">
				{@html city.text}
			</p>
			<div class="flex cursor-pointer items-center gap-[24px]" on:click={() => openForm(city)}>
				<p class="inline-block text-[14px] font-bold uppercase leading-normal -tracking-[0.03em]">
					contacter
				</p>
				<CtaArrow newClass="w-[12px] h-[12px]" />
			</div>
		</div>
	{/each}
</div>

<div
	class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		<img
			src="/img/cas.jpg"
			alt="A REMPLIR"
			class="w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
				? 'animate-fade'
				: 'opacity-0'}"
		/>
	{/if}
</div>

<div
	class="flex justify-between gap-[16px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	<h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">Nous rejoindre</h2>
	<div class="flex flex-1 flex-col">
		{#each jobs as job}
			<div
				class="flex justify-between gap-[16px] border-b border-solid border-shark py-[32px] first:border-t lg:items-center lg:gap-[48px]"
			>
				<p class="flex-1 text-[24px] -tracking-[0.03em]">
					{job.title}
				</p>
				<div class="flex flex-1 justify-between gap-[16px] lg:items-center lg:gap-[48px]">
					<p class="flex-1 text-[24px] -tracking-[0.03em]">
						{job.type}
					</p>
					<p class="text-[24px] -tracking-[0.03em]">
						{job.ville}
					</p>
				</div>
			</div>
		{/each}

		<div class="flex max-lg:py-[56px] lg:pt-[96px]">
			<Cta {cta} />
		</div>
	</div>
</div>

{#if formIsOpened}
	<ContactForm bind:isOpened={formIsOpened} city={contactFormCity} />
{/if}
