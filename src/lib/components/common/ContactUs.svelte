<script lang="ts">
	import { page } from '$app/stores';

	import Cta from './CTA.svelte';
	
	let cta: any;

$: {
	cta = $page.data.layoutContent.contactUs;
}

	export let right = false;
</script>

<div class="flex px-[16px] pb-[56px] lg:px-[48px] lg:pb-[96px] {right ? 'justify-end' : ''}">
	{#if right}
		<div class="w-[calc(50%-16px)] lg:w-[calc(50%-24px)] lg:pr-[calc(100%/12+48px)]">
			<Cta {cta} />
		</div>
	{:else}
		<Cta {cta} />
	{/if}
</div>
