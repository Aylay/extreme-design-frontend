<script lang="ts">
	import { page } from '$app/stores';

	import HpHeader from '$lib/components/HPHeader.svelte';
	import HpProjects from '$lib/components/HPProjects.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import TitleText from '$lib/components/common/TitleText.svelte';
	import OneArticle from '$lib/components/OneArticle.svelte';

	let content: any = $page.data.content;

	$: {
		content = $page.data.content;
	}
</script>

<HpHeader projects={content.hpHeader} />

{#if content.block1}
	<TitleText content={content.block1} />
{/if}

{#if content.projectsList1.length > 0}
	<HpProjects projectsList={content.projectsList1} />
{/if}

{#if content.block2}
	<TitleText content={content.block2} />
{/if}

{#if content.projectsList2.length > 0}
	<HpProjects projectsList={content.projectsList2} />
{/if}

{#if content.block3}
	<TitleText content={content.block3} />
{/if}

{#if content.newsList && content.newsList.length > 0}
	<div
		class="grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]"
	>
		{#each content.newsList as article}
			<OneArticle {article} />
		{/each}
	</div>
{/if}

<ContactUs />
