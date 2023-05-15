<script lang="ts">
	import OneArticle from '$lib/components/OneArticle.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import { page } from '$app/stores';

	let newsList: any;

	$: {
		newsList = $page.data.content.list;
	}
</script>

{#if newsList.length > 0}
	<div
		class="mt-[96px] grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:mt-[112px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]"
	>
		{#each newsList as article}
			<OneArticle {article} />
		{/each}
	</div>
{/if}

<ContactUs />
