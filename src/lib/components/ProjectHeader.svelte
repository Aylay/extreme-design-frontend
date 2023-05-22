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
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	export let mobileImg: any = '';
	export let img: any = '';
	export let tags: Array<any> = [];
	export let name = '';
</script>

<div class="flex h-[calc(100vh-70px)] flex-col lg:h-screen">
	<div
		class="h-full w-full max-lg:flex-1 lg:h-[calc(100%-130px)]"
		use:inview={options}
		on:inview_change={handleChange}
	>
		{#if isInView}
			{#if img.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + img.data.attributes.url}
				alt={img.data.attributes.alternativeText ? img.data.attributes.alternativeText : name}
				class="h-full w-full object-cover {isInView ? 'animate-fade' : 'opacity-0'} max-lg:hidden"
			/>
			{/if}
			{#if img.data.attributes.mime.includes('video')}
			<video
				class="h-full w-full object-cover max-lg:hidden {isInView ? 'animate-fade' : 'opacity-0'} "
				loop
				muted
				playsinline
				autoplay
				controls={false}
			>
				<source
					src={strapiURL + img.data.attributes.url}
					type="video/mp4"
					media="(min-width: 1024px)"
				/>
			</video>
			{/if}
			{#if mobileImg.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + mobileImg.data.attributes.url}
				alt={mobileImg.data.attributes.alternativeText
					? mobileImg.data.attributes.alternativeText
					: name}
				class="h-full w-full object-cover {isInView ? 'animate-fade' : 'opacity-0'} lg:hidden"
			/>
			{/if}
			{#if mobileImg.data.attributes.mime.includes('video')}
			<video
				class="h-full w-full object-cover lg:hidden {isInView ? 'animate-fade' : 'opacity-0'} "
				loop
				muted
				playsinline
				autoplay
				controls={false}
			>
				<source
					src={strapiURL + mobileImg.data.attributes.url}
					type="video/mp4"
					media="(max-width: 1023px)"
				/>
			</video>
			{/if}
		{/if}
	</div>
	<div
		class="flex gap-[16px] px-[16px] max-lg:flex-col max-lg:pb-[46px] max-lg:pt-[32px] lg:flex-1 lg:items-center lg:gap-[48px] lg:px-[48px]"
	>
		<h1 class="flex-1 text-[64px] font-medium leading-none -tracking-[0.03em]">
			{name}
		</h1>
		<ul class="flex flex-1 gap-[36px]">
			{#each tags as tag}
				<li class="text-[16px] font-bold uppercase leading-normal">
					{tag.text}
				</li>
			{/each}
		</ul>
	</div>
</div>
