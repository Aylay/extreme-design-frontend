<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import ProjectImgs from '$lib/components/ProjectImgs.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';
	import IntroH2 from '$lib/components/common/IntroH2.svelte';
	import OneProject from '$lib/components/OneProject.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

let content : any;

$: {
	content = $page.data.content
}

	onMount(() => {
		if ($page.data.projectRedirect) {
			goto('/' + $page.data.actualLang);
		}
	});
</script>

<ProjectHeader img={content.mainImgDesktop} tags={content.tags} name={content.name} mobileImg={content.mainImgMobile} />

{#if content.intro || content.cta1}
<IntroH2
text={content.intro}
cta={content.cta1}
/>
{/if}

{#if content.imgsList.length > 0}
<ProjectImgs imgsList={content.imgsList} />
{/if}

<div class="h-[32px] lg:h-[64px]" />
<ContactUs />


{#if content.otherProjectsTitle || content.otherProjectsList.length > 0}
<h3
	class="px-[16px] pb-[32px] text-m1 font-medium leading-none -tracking-[0.03em] lg:px-[48px] lg:text-[40px]"
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