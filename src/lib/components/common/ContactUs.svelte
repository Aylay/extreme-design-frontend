<script lang="ts">
	import Cta from './CTA.svelte';

	const cta = {
		href: '/contact-us',
		title: 'Contactez nous',
		label: 'Contactez nous'
	};
</script>

<div class="px-[16px] pb-[56px] lg:px-[48px] lg:pb-[96px]">
	<Cta {cta} />
</div>
