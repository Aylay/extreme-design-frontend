<script lang="ts">
	import HpProject from './HPProject.svelte';

	export let projectsList: Array<any> = [];
</script>

<div class="flex flex-col gap-[32px] pb-[56px] px-[16px] lg:gap-[48px] lg:pb-[96px] lg:px-[48px]">
	{#each projectsList as projects}
		<div
			class={projects.projects.length > 1
				? 'lg:grid-cols-' +
				  projects.projects.length +
				  ' grid grid-cols-1 gap-[32px] lg:gap-[48px]'
				: ''}
		>
			{#each projects.projects as project}
				<HpProject {project} projectsLength={projects.projects.length} />
			{/each}
		</div>
	{/each}
</div>
