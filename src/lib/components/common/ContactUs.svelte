<script lang="ts">
	import Cta from './CTA.svelte';

	const cta = {
		href: '/contact-us',
		title: 'Contactez-nous',
		label: 'Contactez-nous'
	};

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
