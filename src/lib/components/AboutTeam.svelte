<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import CtaMore from '../assets/svg/CTAMore.svelte';
	import Hoverable from './utilities/Hoverable.svelte';
	import { page } from '$app/stores';
	let content: any;

	$: {
		content = $page.data.content;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	export let team: Array<any> = [];
	let actualTeam: Array<any> = [];
	let memberPerPage = 6;
	$: actualTeam = team.slice(0, memberPerPage);
</script>

<div class="pb-[56px] lg:pb-[96px]">
	<div
		class="grid grid-cols-1 gap-[32px] px-[16px] lg:grid-cols-3 lg:gap-[48px] lg:px-[48px]"
		use:inview={options}
		on:inview_change={handleChange}
	>
		{#each actualTeam as member}
			<div>
				{#if isInView}
					<img
						src={strapiURL + member.img.data.attributes.url}
						alt={member.img.data.attributes.alternativeText
							? member.img.data.attributes.alternativeText
							: member.name}
						class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
					/>
				{/if}
				{#if member.name}
					<h4 class="mt-[16px] text-[20px] leading-none">
						{member.name}
					</h4>
				{/if}
				{#if member.job}
					<h5 class="mt-[4px] text-[20px] leading-none text-silver">
						{member.job}
					</h5>
				{/if}
			</div>
		{/each}
	</div>

	{#if memberPerPage < team.length}
		<div class="mt-[56px] flex px-[16px] lg:mt-[72px] lg:justify-center">
			<Hoverable let:hovering={active}>
				<div
					class="relative inline-block cursor-pointer pb-[16px]"
					on:click|preventDefault={() => (memberPerPage += 6)}
				>
					<div class="flex items-center gap-[32px]">
						<span
							class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
						>
							{content.showMoreLabel}
						</span>
						<CtaMore />
					</div>
					<div
						class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
							? 'w-0'
							: 'w-full'}"
					/>
				</div>
			</Hoverable>
		</div>
	{/if}
</div>
