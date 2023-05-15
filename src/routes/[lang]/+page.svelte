<script lang="ts">
	import HpHeader from '$lib/components/HPHeader.svelte';
	import HpProjects from '$lib/components/HPProjects.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import TitleText from '$lib/components/common/TitleText.svelte';
	import { page } from '$app/stores';

	let content: any;

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

<ContactUs />
