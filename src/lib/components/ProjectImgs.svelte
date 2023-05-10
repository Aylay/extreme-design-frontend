<script lang="ts">
	import ProjectImg from './ProjectImg.svelte';

	export let imgsList: Array<any> = [];
</script>

<div class="flex flex-col gap-[16px] px-[16px] pb-[16px] lg:gap-[48px] lg:px-[48px] lg:pb-[48px]">
	{#each imgsList as imgs}
		<div class="grid grid-cols-1 gap-[16px] lg:gap-[48px] lg:grid-cols-{imgs.length}">
			{#each imgs as img}
				<ProjectImg {img} />
			{/each}
		</div>
	{/each}
</div>
