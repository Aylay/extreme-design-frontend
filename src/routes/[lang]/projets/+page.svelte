<script lang="ts">
	import { page } from '$app/stores';

	import OneProject from '$lib/components/OneProject.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;
	$: content = $page.data.content;

</script>

<svelte:head>
	<link
		rel="prefetch"
		href={strapiURL + content.mainMediaDesktop.data.attributes.url}
		as={content.mainMediaDesktop.data.attributes.mime.includes('video') ? 'video' : 'image'}
	/>
	<link
		rel="prefetch"
		href={strapiURL + content.mainMediaMobile.data.attributes.url}
		as={content.mainMediaMobile.data.attributes.mime.includes('video') ? 'video' : 'image'}
	/>
</svelte:head>

<div class="relative mb-[56px] h-[calc(100vh-70px)] w-full lg:mb-[96px] lg:h-screen">
	<div class="absolute inset-y-0 left-0 h-full w-2/5 bg-gradient-to-r from-black opacity-5 max-lg:hidden" />
	{#if content.mainMediaDesktop.data.attributes.mime.includes('image')}
		<img
			src={strapiURL + content.mainMediaDesktop.data.attributes.url}
			alt={content.mainMediaDesktop.data.attributes.alternativeText
				? content.mainMediaDesktop.data.attributes.alternativeText : ''}
			class="h-full w-full object-cover max-lg:hidden"
		/>
	{/if}
	{#if content.mainMediaMobile.data.attributes.mime.includes('image')}
		<img
			src={strapiURL + content.mainMediaMobile.data.attributes.url}
			alt={content.mainMediaMobile.data.attributes.alternativeText
				? content.mainMediaMobile.data.attributes.alternativeText : ''}
			class="h-full w-full object-cover lg:hidden"
		/>
	{/if}
	{#if content.mainMediaDesktop.data.attributes.mime.includes('video')}
		<video
			class="h-full w-full object-cover max-lg:hidden"
			loop
			muted
			playsinline
			autoplay
			controls={false}
			src={strapiURL + content.mainMediaDesktop.data.attributes.url}
		>
			<source
				src={strapiURL + content.mainMediaDesktop.data.attributes.url}
				type="video/mp4"
				media="(min-width: 1024px)"
			/>
		</video>
	{/if}
	{#if content.mainMediaMobile.data.attributes.mime.includes('video')}
		<video
			class="h-full w-full object-cover lg:hidden"
			loop
			muted
			playsinline
			autoplay
			controls={false}
			src={strapiURL + content.mainMediaMobile.data.attributes.url}
		>
			<source
				src={strapiURL + content.mainMediaMobile.data.attributes.url}
				type="video/mp4"
				media="(max-width: 1023px)"
			/>
		</video>
	{/if}
</div>

{#if (content.title && content.title !== '') || (content.bigTitle && content.bigTitle !== '')}
<div class="flex justify-between gap-[8px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]">
	<h1 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">
		{@html content.bigTitle}
	</h1>
	<h2 class="flex-1 max-lg:text-m2 lg:text-medium">
		{@html content.title}
	</h2>
</div>
{/if}

{#if content.projectsList.data.length > 0}
	<div class="grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]">
		{#each content.projectsList.data as project}
			<OneProject project={project.attributes} projectsPage={true} />
		{/each}
	</div>
{/if}

<ContactUs />
