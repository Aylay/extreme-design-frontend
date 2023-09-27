<script lang="ts">
	import { page } from '$app/stores';
  import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import Cta from './CTA.svelte';

  let isInView: boolean;
  const options: Options = {
    unobserveOnEnter: true,
    rootMargin: '50px'
  };
  const strapiURL = import.meta.env.VITE_STRAPI_URL;

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    isInView = detail.inView;
  };

  export let column: any;
  export let length: number;
  let cta: any;
	let actualLang: any;

	$: {
		actualLang = $page.data.actualLang;
	}

  if (column.ctaLink && column.ctaLink !== '' && column.ctaLabel && column.ctaLabel !== '') {
    cta = {
      slug: column.ctaLink,
      title: column.ctaLabel,
      label: column.ctaLabel
    }
  }
</script>

<div
  class="{column.layout === 'texte' && length === 1 ? 'lg:w-2/3' : 'flex-1'}"
	use:inview={options}
	on:inview_change={handleChange}
>
  {#if column.layout === 'image'}
    {#if column.imgLink && column.imgLink !== ''}
      <a
        href={column.imgLink.includes('http') ? column.imgLink : '/' + actualLang + column.imgLink}
        class="w-full"
        target={column.imgLink.includes('http') ? '_blank' : '_self'}
      >
      {#if isInView}
        <img
          src={strapiURL + column.image.data.attributes.url}
          alt={column.image.data.attributes.alternativeText
            ? column.image.data.attributes.alternativeText
            : ''}
          class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
        />
      {/if}
      </a>
    {:else}
      {#if isInView}
        <img
          src={strapiURL + column.image.data.attributes.url}
          alt={column.image.data.attributes.alternativeText
            ? column.image.data.attributes.alternativeText
            : ''}
          class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
        />
      {/if}
    {/if}
    {#if column.legendImage && column.legendImage !== ''}
    <p class="text-[18px] font-medium leading-[26px] lg:text-[24px] lg:leading-[32px] mt-[16px]">
      {column.legendImage}
    </p>
    {/if}
  {:else}
    {#if column.titre && column.titre !== ''}
      <h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">
        {@html column.titre}
      </h2>
    {/if}
    {#if column.contenu}
    <div class="mt-[24px] content-text">
      {@html column.contenu}
    </div>
    {/if}
    {#if column.ctaLink && column.ctaLink !== '' && column.ctaLabel && column.ctaLabel !== ''}
			<div class="flex mt-[48px]">
				<Cta {cta} />
			</div>
		{/if}
  {/if}
</div>