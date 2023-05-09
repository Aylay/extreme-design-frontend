<script lang="ts">
	import type Link from '$lib/interface/link';
	import ArrowCta from '../../assets/svg/CTAArrow.svelte';
	import Hoverable from '../utilities/Hoverable.svelte';

	export let cta: Link;
</script>

<Hoverable let:hovering={active}>
	<a
		href={cta.href.includes('http') ? cta.href : cta.href}
		class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
		title={cta.title ? cta.title : cta.label}
		target={cta.href.includes('http') ? '_blank' : ''}
	>
		<div class="flex items-center gap-[24px] lg:gap-[32px]">
			<span
				class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
			>
				{cta.label}
			</span>
			<ArrowCta />
		</div>
		<div
			class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
				? 'w-[1px]'
				: 'w-full'}"
		/>
	</a>
</Hoverable>
