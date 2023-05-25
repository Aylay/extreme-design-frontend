<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import AboutContentImg from '$lib/components/AboutContentImg.svelte';
	import AboutImgLinks from '$lib/components/AboutImgLinks.svelte';
	import Intro from '$lib/components/common/Intro.svelte';
	import Numbers from '$lib/components/common/Numbers.svelte';
	import TitleText from '$lib/components/common/TitleText2.svelte';
	import SliderImg from '$lib/components/common/SliderImg.svelte';
	import AboutTeam from '$lib/components/AboutTeam.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import { page } from '$app/stores';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;

	$: {
		content = $page.data.content;
	}

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<div class="max-lg:hidden lg:h-[70px]" />

<Intro text={content.title} />

<div
	class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		{#if content.media.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + content.media.data.attributes.url}
				alt={content.media.data.attributes.alternativeText
					? content.media.data.attributes.alternativeText
					: content.title}
				class="h-auto w-full max-lg:hidden {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if content.mediaMobile.data && content.mediaMobile.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + content.mediaMobile.data.attributes.url}
				alt={content.mediaMobile.data.attributes.alternativeText
					? content.mediaMobile.data.attributes.alternativeText
					: content.title}
				class=" h-full w-full object-cover lg:hidden {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if content.media.data.attributes.mime.includes('video')}
			<video
				class="h-auto w-full max-lg:hidden"
				loop
				muted
				id="video"
				preload="metadata"
				playsinline
				autoplay
				controls={false}
				src={strapiURL + content.media.data.attributes.url}
			>
				<source
					src={strapiURL + content.media.data.attributes.url}
					type="video/mp4"
					media="(min-width: 1024px)"
				/>
			</video>
		{/if}
		{#if content.mediaMobile.data && content.mediaMobile.data.attributes.mime.includes('video')}
			<video
				class="h-full w-full object-cover lg:hidden"
				loop
				muted
				id="video"
				preload="metadata"
				playsinline
				autoplay
				controls={false}
				src={strapiURL + content.mediaMobile.data.attributes.url}
			>
				<source
					src={strapiURL + content.mediaMobile.data.attributes.url}
					type="video/mp4"
					media="(max-width: 1023px)"
				/>
			</video>
		{/if}
	{/if}
</div>

<Numbers numbers={content.numbers} />

<TitleText title={content.title2} text={content.text2} cta={content.cta2} />

{#if content.cities.length > 0}
	<AboutImgLinks cities={content.cities} />
{/if}

<AboutContentImg
	title={content.title3}
	text={content.text3}
	img={content.img3}
	cta={content.cta3}
/>

{#if content.imgsList.data && content.imgsList.data.length > 0}
	<SliderImg images={content.imgsList.data} />
{/if}

{#if content.title4}
	<h3
		class="mb-[16px] px-[16px] max-lg:text-m1 lg:mb-[48px] lg:px-[48px] lg:text-medium lg:font-medium"
	>
		{content.title4}
	</h3>
{/if}

{#if content.team.length > 0 && content.showMoreLabel}
	<AboutTeam team={content.team} />
{/if}

<ContactUs />
