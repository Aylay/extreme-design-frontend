<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import CtaMore from './svg/CTAMore.svelte';
	import Hoverable from './utilities/Hoverable.svelte';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
	isInView = detail.inView;
};

	export let team: Array<any> = [];
	let actualTeam: Array<any> = [];
	let memberPerPage = 6;
	$: actualTeam = team.slice(0, memberPerPage);
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-[32px] lg:gap-[48px] px-[16px] lg:px-[48px]" use:inview={options} on:inview_change={handleChange}>
	{#each actualTeam as member}
		<div>
			{#if isInView}
			<img
				src={member.img.data.attributes.url}
				alt={member.img.data.attributes.alternativeText
					? member.img.data.attributes.alternativeText
					: member.name}
				class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
			{/if}
			<h4 class="mt-[16px] text-[20px] leading-none">
				{member.name}
			</h4>
			<h5 class="mt-[4px] text-[20px] leading-none text-silver">
				{member.job}
			</h5>
		</div>
	{/each}
</div>

{#if memberPerPage < team.length}
	<div class="flex lg:justify-center px-[16px] mt-[56px] lg:mt-[72px]">
		<Hoverable let:hovering={active}>
			<div
				class="relative inline-block cursor-pointer pb-[16px]"
				on:click|preventDefault={() => (memberPerPage += 6)}
			>
				<div class="flex items-center gap-[32px]">
					<span class="flex-1 text-[14px] lg:text-[18px] font-bold uppercase leading-none -tracking-[0.03em] py-[2px]">
						Afficher plus
					</span>
					<CtaMore />
				</div>
				<div
					class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
						? 'w-[1px]'
						: 'w-full'}"
				/>
			</div>
		</Hoverable>
	</div>
{/if}
