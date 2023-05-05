<script lang="ts">
	import Cta from './CTA.svelte';
	import type Link from '$lib/interface/link';

	export let title = '';
	export let text = '';
	export let cta: Link = {
		href: '',
		title: '',
		label: ''
	};
</script>

<div
	class="flex justify-between gap-[8px] px-[16px] pb-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	<h2 class="flex-1 max-lg:text-m1 lg:text-medium lg:font-medium">
		{@html title}
	</h2>
	<div class="flex flex-1 flex-col gap-[56px] lg:gap-[58px]">
		<h3 class="max-lg:text-m2 lg:text-medium">{@html text}</h3>
		{#if cta.href !== ''}
			<div class="flex">
				<Cta {cta} />
			</div>
		{/if}
	</div>
</div>
