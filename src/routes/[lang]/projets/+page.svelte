<script lang="ts">
	import { page } from '$app/stores';

	import Intro from '$lib/components/common/Intro.svelte';
	import OneProject from '$lib/components/OneProject.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';

	let content: any;
	$: content = $page.data.content;

</script>

{#if content.title && content.title !== ''}
<div class="max-lg:hidden lg:h-[70px]" />

<Intro text={content.title} />
{/if}

{#if content.projectsList.data.length > 0}
	<div
		class="grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px] {content.title && content.title !== '' ? '' : 'mt-[96px] lg:mt-[112px]'}"
	>
		{#each content.projectsList.data as project}
			<OneProject project={project.attributes} projectsPage={true} />
		{/each}
	</div>
{/if}

<ContactUs />
