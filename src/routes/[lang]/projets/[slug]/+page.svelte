<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import ProjectImgs from '$lib/components/ProjectImgs.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import IntroH2 from '$lib/components/common/IntroH2.svelte';
	import OneProject from '$lib/components/OneProject.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let content: any;

	function cleanString(str: string) {
		return str.replace(/[\s#]/g, '');
	}

	$: {
		content = $page.data.content;
	}

  $: bgColor =
    content?.bgColor && content.bgColor.trim().length > 0
      ? `#${cleanString(content.bgColor)}`
      : 'white';

	onMount(() => {
		if ($page.data.projectRedirect) {
			goto('/' + $page.data.actualLang);
		}
	});
</script>

<section style="background-color: {bgColor};">
	<ProjectHeader
		img={content.img}
		tags={content.tags}
		name={content.name}
		mobileImg={content.imgMobile}
	/>
	
	{#if content.intro || content.cta1}
		<IntroH2 text={content.intro} />
	{/if}
	
	{#if content.imgsList.length > 0}
		<ProjectImgs imgsList={content.imgsList} />
	{/if}
	
	<div class="h-[32px] lg:h-[64px]" />
	<ContactUs />
	
	{#if content.otherProjectsTitle && content.otherProjectsList.length > 0}
		<h3
			class="px-[16px] pb-[32px] text-m1 font-black font-champ tracking-[0.05rem] leading-none lg:px-[48px] lg:text-[40px]"
		>
			{content.otherProjectsTitle}
		</h3>
	
		<div
			class="grid grid-cols-1 gap-[32px] px-[16px] pb-[56px] lg:grid-cols-2 lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
		>
			{#each content.otherProjectsList as project}
				<OneProject {project} />
			{/each}
		</div>
	{/if}
</section>
