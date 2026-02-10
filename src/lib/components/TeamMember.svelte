<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
  import Hoverable from './utilities/Hoverable.svelte';

  export let member: any;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<div 
		use:inview={options}
		on:inview_change={handleChange}>
  <Hoverable let:hovering={active}>
    {#if isInView}
      {#if active && member.img2 && member.img2.data && member.img2.data.attributes.url}
          <img
            src={strapiURL + member.img2.data.attributes.url}
            alt={member.img2.data.attributes.alternativeText
              ? member.img2.data.attributes.alternativeText
              : member.name}
            class="h-auto w-full rounded-[2.2rem] overflow-hidden {isInView ? 'animate-fade' : 'opacity-0'}"
          />
      {:else}
        <img
          src={strapiURL + member.img.data.attributes.url}
          alt={member.img.data.attributes.alternativeText
            ? member.img.data.attributes.alternativeText
            : member.name}
          class="h-auto w-full rounded-[2.2rem] overflow-hidden {isInView ? 'animate-fade' : 'opacity-0'}"
        />
      {/if}
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
  </Hoverable>
</div>