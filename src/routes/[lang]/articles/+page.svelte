<script lang="ts">
	import { page } from '$app/stores';

	import OneArticle from '$lib/components/OneArticle.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import Intro from '$lib/components/common/Intro.svelte';

	let content: any = $page.data.content;
	let newsList: any = content.list;

	$: {
		content = $page.data.content;
		newsList = content.list;
	}
</script>

{#if content.title && content.title !== ''}
<div class="max-lg:hidden lg:h-[70px]" />

<Intro text={content.title} />
{/if}

{#if newsList.length > 0}
	<div
		class="grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px] {content.title && content.title !== '' ? '' : 'mt-[96px] lg:mt-[112px]'}"
	>
		{#each newsList as article}
			<OneArticle {article} />
		{/each}
	</div>
{/if}

<ContactUs />