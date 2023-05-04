<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '0px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	const nav = [
		{
			slug: '/legals',
			label: 'Mentions légales',
			title: 'Mentions légales'
		},
		{
			slug: 'https://beavers-agency.fr',
			label: 'Instagram',
			title: 'the work'
		},
		{
			slug: '#',
			label: 'work',
			title: 'the work'
		}
	];
</script>

<div
	class="flex lg:items-center justify-between max-lg:px-[16px] max-lg:gap-[16px] px-[4.8rem] py-8 max-lg:mt-[108px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	<div class="max-lg:flex-1 max-lg:flex-col flex lg:items-center max-lg:gap-[8px] gap-4">
		<p class="lg:pt-2 text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em]">
			Extreme Design est une société du groupe
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
	<ul class="max-lg:flex-1 max-lg:flex-col flex lg:gap-6">
		{#each nav as item}
			<li>
				<a
					href={item.slug}
					target={item.slug.includes('http') ? '_blank' : ''}
					title={item.title}
					class="text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em]"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
