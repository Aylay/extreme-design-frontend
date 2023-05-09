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
  export let name: string = '';
</script>

<div class="lg:h-screen flex flex-col max-lg:pb-[48px]">
  <div class="lg:h-[calc(100%-130px)] w-full"
	use:inview={options}
	on:inview_change={handleChange}>
	{#if isInView}
  <img
    src={img.data.attributes.url}
    alt={img.data.attributes.alternativeText
      ? img.data.attributes.alternativeText
      : name}
    class="w-full h-full object-cover {isInView ? 'animate-fade' : 'opacity-0'}"
  />
{/if}
  </div>
  <div class="flex-1 flex max-lg:flex-col max-lg:pt-[32px] gap-[16px] lg:gap-[48px] lg:items-center px-[16px] lg:px-[48px]">
      <h1 class="font-medium text-[64px] -tracking-[0.03em] leading-none flex-1">
        {name}
      </h1>
      <ul class="flex-1 flex gap-[36px]">
        {#each tags as tag}
          <li class="uppercase font-bold text-[16px] leading-normal">
            {tag}
          </li>
        {/each}
      </ul>
    </div>
</div>