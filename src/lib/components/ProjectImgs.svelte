<script lang="ts">
	import ProjectImg from "./ProjectImg.svelte";

	export let imgsList: Array<any> = [];
</script>

<div class="flex flex-col gap-[16px] lg:gap-[48px] pb-[16px] lg:pb-[48px] px-[16px] lg:px-[48px]">
	{#each imgsList as imgs}
		<div
		class="grid-cols-1 grid gap-[16px] lg:gap-[48px] lg:grid-cols-{imgs.length}"
		>
			{#each imgs as img}
				<ProjectImg {img} />
			{/each}
		</div>
	{/each}
</div>
