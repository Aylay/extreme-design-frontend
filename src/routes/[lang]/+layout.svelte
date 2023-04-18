<script lang="ts">
	import '../../app.css';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import GTM from '$lib/components/utilities/GTM.svelte';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';

	const siteUrl = import.meta.env.VITE_SITE_URL;
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	let langRemaining: any = [];

	onMount(() => {
		// if (redirect) {
		// 	goto('/es');
		// }
		// document.documentElement.lang = actualLang;
	});
</script>

<!-- <GTM gtmId="GTM-T623VJ8" /> -->

<svelte:head>
	{#if $page.data.content}
		<title>{$page.data.content.meta.title}</title>
		<meta name="title" content={$page.data.content.meta.title} />
		<meta property="og:title" content={$page.data.content.meta.title} />
		<meta name="description" content={$page.data.content.meta.description} />
		<meta property="og:description" content={$page.data.content.meta.description} />
		{#if $page.data.content.meta.image && $page.data.content.meta.image.data}
			<meta
				property="og:image"
				content="{strapiURL}{$page.data.content.meta.image.data.attributes.url}"
			/>
			<meta
				property="og:image:width"
				content={$page.data.content.meta.image.data.attributes.width}
			/>
			<meta
				property="og:image:height"
				content={$page.data.content.meta.image.data.attributes.height}
			/>
		{/if}
	{/if}
	<!-- {#if langRemaining.length > 0}
		{#each langRemaining as lang}
			<link
				rel="alternate"
				hreflang={lang.locale}
				href="{siteUrl}/{lang.locale}{restOfUrl ? '/' + restOfUrl : ''}"
			/>
		{/each}
		<link
			rel="alternate"
			hreflang="x-default"
			href="{siteUrl}/es{restOfUrl ? '/' + restOfUrl : ''}"
		/>
	{/if} -->
</svelte:head>

<Header />
<slot />
<Footer />
