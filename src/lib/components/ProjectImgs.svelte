<script lang="ts">
	import ProjectComparaison from './ProjectComparaison.svelte';
	import ProjectImg from './ProjectImg.svelte';
	import ProjectSlider from './ProjectSlider.svelte';

	export let imgsList: Array<any> = [];
</script>

<div class="flex flex-col gap-[16px] px-[16px] pb-[56px] lg:gap-[48px] lg:px-[48px] lg:pb-[96px]">
	{#each imgsList as imgs}
	{#if imgs.layout === 'liste' || !imgs.layout}
	<div class="grid grid-cols-1 gap-[16px] lg:gap-[48px] lg:grid-cols-{imgs.imgs.data.length}">
		{#each imgs.imgs.data as img}
			<ProjectImg {img} />
		{/each}
	</div>
	{:else if imgs.layout === 'slider'}
	<ProjectSlider imgs={imgs.imgs.data} />
	{:else if imgs.layout === 'avant / apres'}
	<ProjectComparaison imgs={imgs.imgs.data} />
	{/if}
	{/each}
</div>
