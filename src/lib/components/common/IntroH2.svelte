<script lang="ts">
	import { page } from '$app/stores';
	import Cta from './CTA.svelte';

let cta: any;

$: {
	cta = $page.data.layoutContent.contactUs;
}

	export let text = '';
</script>

<div class="flex justify-end px-[16px] py-[56px] lg:px-[48px] lg:py-[96px]">
	<div class="flex w-full flex-col gap-[56px] lg:w-[calc(50%-24px)] lg:gap-[58px]">
		{#if text}
			<h2 class="max-lg:text-m2 lg:text-medium">{@html text}</h2>
		{/if}
		{#if cta}
			<div class="flex">
				<Cta {cta} />
			</div>
		{/if}
	</div>
</div>
