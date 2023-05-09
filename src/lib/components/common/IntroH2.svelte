<script lang="ts">
	import type Link from '$lib/interface/link';
	import Cta from './CTA.svelte';

	export let text = '';
	export let cta: Link = {
		href: '',
		title: '',
		label: ''
	};
</script>

<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="w-full lg:w-[calc(50%-24px)] flex flex-col gap-[56px] lg:gap-[58px]">
		<h2 class="max-lg:text-m2 lg:text-medium">{text}</h2>
			{#if cta.href !== ''}
				<div class="flex">
					<Cta {cta} />
				</div>
			{/if}
			</div>
</div>
