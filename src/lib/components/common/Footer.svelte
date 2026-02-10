<script lang="ts">
	import { page } from '$app/stores';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '0px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	let layoutContent: any;
	let actualLang: any;
	let content: any;
	let bgColor: string;

	function cleanString(str: string) {
		return str.replace(/[\s#]/g, '');
	}

	$: {
		layoutContent = $page.data.layoutContent;
		actualLang = $page.data.actualLang;
		content = $page.data.content;
	}

  $: bgColor =
    content?.bgColor && content.bgColor.trim().length > 0
      ? `#${cleanString(content.bgColor)}`
      : 'white';
</script>

{#if layoutContent}
	<footer
		class="flex max-lg:flex-col justify-between px-[4.8rem] py-8 max-lg:pt-[108px] max-lg:gap-[16px] max-lg:px-[16px] lg:items-center"
		style="background-color: {bgColor};"
		use:inview={options}
		on:inview_change={handleChange}
	>
		<div class="flex gap-4 max-lg:flex-col max-lg:gap-[8px] lg:items-center">
			<p
				class="text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em] lg:pt-2"
			>
				{layoutContent.legalText}
			</p>
			{#if isInView}
				<a href="https://extreme.fr/" target="_blank">
					<img
						src="/img/logo-extreme.jpg"
						alt="logo Extreme"
						class="h-auto w-full max-w-[10rem] {isInView ? 'animate-fade' : 'opacity-0'}"
					/>
				</a>
			{/if}
		</div>
		<ul class="flex max-lg:flex-col lg:gap-6">
			{#each layoutContent.footerMenu as item}
				<li>
					<a
						href={item.slug.includes('http') ? item.slug : '/' + actualLang + item.slug}
						target={item.slug.includes('http') ? '_blank' : ''}
						title={item.title ? item.title : item.label}
						class="text-[1.8rem] uppercase leading-none max-lg:leading-[24px] max-lg:-tracking-[0.03em]"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</footer>
{/if}
