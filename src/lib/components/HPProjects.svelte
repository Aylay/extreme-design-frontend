<script lang="ts">
	import HpProject from './HPProject.svelte';

	export let projectsList: Array<any> = [];
</script>

<div class="flex flex-col gap-[32px] lg:gap-[48px] pb-[56px] lg:pb-[96px]">
	{#each projectsList as projects}
		<div
			class={projects.length > 1
				? 'lg:grid-cols-' + projects.length + ' grid-cols-1 grid gap-[32px] lg:gap-[48px] px-[16px] lg:px-[48px]'
				: ''}
		>
			{#each projects as project}
				<HpProject {project} projectsLength={projects.length} />
			{/each}
		</div>
	{/each}
</div>
