<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

  import OneArticle from '$lib/components/OneArticle.svelte';
	import Intro from '$lib/components/common/Intro.svelte';

let isInView: boolean;
const options: Options = {
  unobserveOnEnter: true,
  rootMargin: '50px'
};

const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
  isInView = detail.inView;
};

const newsList: Array<any> = [
  {
    title: 'Sophie Grenier de Warrens dirige le pôle conseil d’Extreme !',
    img: {
      data: {
        attributes: {
          url: '/img/cas.jpg',
          alternativeText: 'coucou'
        }
      }
    },
    slug: '/coucou'
  },
  {
    title: 'Paris',
    img: {
      data: {
        attributes: {
          url: '/img/cas.jpg',
          alternativeText: 'coucou'
        }
      }
    },
    slug: '/coucou'
  }
];

</script>

<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="w-[calc(75%-16px)] lg:w-[calc(50%-24px)] lg:pr-[calc(100%/12+48px)]">
		<h1 class="max-lg:text-m1 lg:text-medium">Miaaam – Une brigade d'expert au service des marques</h1>
	</div>
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
			class=" w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
				? 'animate-fade'
				: 'opacity-0'}"
		/>
	{/if}
</div>

<div class="px-[16px] lg:px-[48px] lg:grid lg:grid-cols-2 mb-[56px] lg:mb-[96px]">
  <div class="lg:col-span-1 mx-auto content-text">
    <p>coucou</p>
  </div>
</div>

{#if newsList}
<div class="px-[16px] lg:px-[48px] mb-[56px] lg:mb-[96px]">
  <h3 class="font-medium text-[32px] max-lg:leading-[32px] lg:text-[40px] -tracking-[0.03em] mb-[40px]">Autres articles</h3>

  <div
    class="grid grid-cols-1 gap-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px]"
  >
    {#each newsList as article}
      <OneArticle {article} />
    {/each}
  </div>
</div>
{/if}