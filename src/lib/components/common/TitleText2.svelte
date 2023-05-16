<script lang="ts">
	import type Link from '$lib/interface/link';
	import Cta from './CTA.svelte';

	export let title: any;
	export let text: any;
	export let cta: Link;
</script>

<div
	class="flex justify-between gap-[8px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#if title}
		<h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">
			{@html title}
		</h2>
	{/if}
	<div class="flex flex-1 flex-col gap-[56px] lg:gap-[58px]">
		{#if text}
			<h3 class="max-lg:text-m2 lg:text-medium">{@html text}</h3>
		{/if}
		{#if cta && cta.slug !== ''}
			<div class="flex">
				<Cta {cta} />
			</div>
		{/if}
	</div>
</div>
