<script lang="ts">
	import OneProject from '$lib/components/OneProject.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import { page } from '$app/stores';

	let projectsList: any;

	$: {
		projectsList = $page.data.projectsList;
	}
</script>

{#if projectsList.length > 0}
	<div
		class="mt-[96px] grid grid-cols-1 gap-[56px] px-[16px] pb-[56px] lg:mt-[112px] lg:grid-cols-2 lg:gap-x-[48px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px]"
	>
		{#each projectsList as project}
			<OneProject project={project.attributes} projectsPage={true} />
		{/each}
	</div>
{/if}

<ContactUs />
