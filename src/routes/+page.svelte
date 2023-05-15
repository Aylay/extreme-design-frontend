<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	onMount(() => {
		const userLang = navigator.language || navigator.userLanguage;
		if (userLang) {
			const userLangFirstTwo = userLang.substring(0, 2);

			if (userLangFirstTwo === 'en' || userLangFirstTwo === 'pt') {
				goto('/' + userLangFirstTwo);
			} else {
				goto('/fr');
			}
		}
	});
</script>

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
</svelte:head>
