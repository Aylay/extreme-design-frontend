<script lang="ts">
	import { page } from '$app/stores';
  import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import Cta from './CTA.svelte';
	import LpForm from '$lib/components/common/LPForm.svelte';
	import Hoverable from '$lib/components/utilities/Hoverable.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';

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
  export let formation: boolean = false;
  let cta: any;
	let actualLang: any;
	let formIsOpened = false;

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

  function openForm() {
    document.body.classList.add('overflow-hidden');
    formIsOpened = true;
  }
  console.log(column)
</script>

<div
  class="{column.layout === 'texte' && length === 1 && !formation ? 'lg:w-2/3' : 'flex-1'}"
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
        {#if column.image.data.attributes.mime.includes('image')}
					<img
						src={strapiURL + column.image.data.attributes.url}
						alt={column.image.data.attributes.alternativeText ? column.image.data.attributes.alternativeText : ''}
						class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
					/>
				{/if}
				{#if column.image.data.attributes.mime.includes('video')}
          <video
            class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
            loop
            muted
            id="video"
            preload="metadata"
            playsinline
            autoplay
            controls={false}
            src={strapiURL + column.image.data.attributes.url}
          >
            <source
              src={strapiURL + column.image.data.attributes.url}
              type="video/mp4"
            />
          </video>
				{/if}
      {/if}
      </a>
    {:else}
      {#if isInView}
        {#if column.image.data.attributes.mime.includes('image')}
					<img
						src={strapiURL + column.image.data.attributes.url}
						alt={column.image.data.attributes.alternativeText ? column.image.data.attributes.alternativeText : ''}
						class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
					/>
				{/if}
				{#if column.image.data.attributes.mime.includes('video')}
          <video
            class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
            loop
            muted
            id="video"
            preload="metadata"
            playsinline
            autoplay
            controls={false}
            src={strapiURL + column.image.data.attributes.url}
          >
            <source
              src={strapiURL + column.image.data.attributes.url}
              type="video/mp4"
            />
          </video>
				{/if}
      {/if}
    {/if}
    {#if column.legendImage && column.legendImage !== ''}
    <p class="text-[18px] font-medium leading-[26px] lg:text-[24px] lg:leading-[32px] mt-[16px]">
      {column.legendImage}
    </p>
    {/if}
  {:else if column.layout === 'texte'}
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
    {#if column.ctaLink && column.ctaLink !== '' && column.ctaLabel && column.ctaLabel !== '' && !column.ctaContact}
			<div class="flex mt-[48px]">
				<Cta {cta} />
			</div>
		{/if}
    {#if column.ctaContact && column.ctaLabel && column.ctaLabel !== ''}
    <div class="flex mt-[48px]">
      <Hoverable let:hovering={active}>
        <button
          class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
          on:click={() => openForm()}
        >
          <div class="flex items-center gap-[24px] lg:gap-[32px]">
            <span
            class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
            >
            {column.ctaLabel}
          </span>
          <ArrowCta />
        </div>
        <div
        class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
          ? 'w-0'
          : 'w-full'}"
          />
        </button>
      </Hoverable>
    </div>
    {/if}
  {/if}
</div>

{#if column.ctaContact && formIsOpened}
	<LpForm bind:isOpened={formIsOpened} />
{/if}