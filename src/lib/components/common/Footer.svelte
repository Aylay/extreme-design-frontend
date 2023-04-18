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
	class="flex items-center justify-between px-[4.8rem] py-8"
	use:inview={options}
	on:inview_change={handleChange}
>
	<div class="flex items-center gap-4">
		<p class="pt-2 text-[1.8rem] uppercase leading-none">
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
	<ul class="flex gap-6">
		{#each nav as item}
			<li>
				<a
					href={item.slug}
					target={item.slug.includes('http') ? '_blank' : ''}
					title={item.title}
					class="text-[1.8rem] uppercase leading-none"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
