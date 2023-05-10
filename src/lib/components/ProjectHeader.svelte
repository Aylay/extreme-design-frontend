<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	export let mobileImg: any = '';
	export let img: any = '';
	export let tags: Array<string> = [];
	export let name = '';
</script>

<div class="flex flex-col max-lg:pb-[48px] lg:h-screen">
	<div class="w-full lg:h-[calc(100%-130px)]" use:inview={options} on:inview_change={handleChange}>
		{#if isInView}
			<img
				src={img.data.attributes.url}
				alt={img.data.attributes.alternativeText ? img.data.attributes.alternativeText : name}
				class="h-full w-full object-cover {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
	</div>
	<div
		class="flex flex-1 gap-[16px] px-[16px] max-lg:flex-col max-lg:pt-[32px] lg:items-center lg:gap-[48px] lg:px-[48px]"
	>
		<h1 class="flex-1 text-[64px] font-medium leading-none -tracking-[0.03em]">
			{name}
		</h1>
		<ul class="flex flex-1 gap-[36px]">
			{#each tags as tag}
				<li class="text-[16px] font-bold uppercase leading-normal">
					{tag}
				</li>
			{/each}
		</ul>
	</div>
</div>
