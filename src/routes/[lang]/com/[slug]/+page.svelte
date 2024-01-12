<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import Hoverable from '$lib/components/utilities/Hoverable.svelte';
	import LpForm from '$lib/components/common/LPForm.svelte';
	import ContentManager from '$lib/components/common/ContentManager.svelte';

	let content: any = $page.data.content;
	let formIsOpened = false;

	$: {
		content = $page.data.content;
	}

	onMount(() => {
		if ($page.data.lpRedirect) {
			goto('/' + $page.data.actualLang);
		}
	});

	function openForm() {
		document.body.classList.add('overflow-hidden');
		formIsOpened = true;
	}

</script>

{#if content.title && content.title != ''}
<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="w-[calc(75%-16px)] lg:w-[calc(50%-24px)] lg:pr-[calc(100%/12+48px)]">
		<h1 class="max-lg:text-m1 lg:text-medium">
			{content.title}
		</h1>
	</div>
</div>
{/if}

{#if content.contentManager.length > 0}
<div class="flex flex-col gap-[56px] px-[16px] pb-[56px] lg:gap-y-[96px] lg:px-[48px] lg:pb-[96px] {!content.title || content.title === '' ? 'pt-[56px] lg:pt-[96px]' : ''}">
	{#each content.contentManager as row}
		<div class="flex max-lg:flex-col gap-[56px] lg:gap-x-[48px] {row.colonnes.length === 1 ? 'justify-center' : ''}">
			{#each row.colonnes as column}
			<ContentManager {column} length={row.colonnes.length} />
			{/each}
		</div>
	{/each}
</div>
{/if}

{#if content.contact}
<div class="flex px-[16px] pb-[56px] lg:px-[48px] lg:pb-[96px]">
	<Hoverable let:hovering={active}>
		<button
			class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
			on:click={() => openForm()}
		>
			<div class="flex items-center gap-[24px] lg:gap-[32px]">
				<span
				class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
				>
				{content.contactLabel}
			</span>
			<ArrowCta />
		</div>
		<div
		class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
			? 'w-0'
			: 'w-full'}"
			/>
		</button>
	</Hoverable>
</div>
{/if}

{#if formIsOpened}
	<LpForm bind:isOpened={formIsOpened} />
{/if}