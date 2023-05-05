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

<div class="flex max-lg:flex-col justify-between gap-[8px] lg:gap-[48px] px-[16px] lg:px-[48px] pb-[56px] lg:pb-[96px]">
	<h2 class="flex-1 lg:font-medium max-lg:text-m1 lg:text-medium">
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
