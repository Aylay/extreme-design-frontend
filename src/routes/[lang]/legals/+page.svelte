<script lang="ts">
	import { afterUpdate } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { page } from '$app/stores';

	let content: any;

	$: {
		content = $page.data.content;
	}

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};
	let y: number;

	let isActiveLegals: number;
	let isActiveLegalsMobile: number;

	afterUpdate(() => {
		for (const text of content.texts) {
			const legalsDiv = document.getElementById(
				text.id + '-' + text.title.split(' ')[0].toLowerCase()
			);
			if (legalsDiv) {
				const legalsOffset = getOffsetTop(text.id + '-' + text.title.split(' ')[0].toLowerCase());
				const legalsDivHeight = legalsDiv.offsetHeight;
				if (y + 180 >= legalsOffset && y + 180 <= legalsOffset + legalsDivHeight) {
					isActiveLegals = text.id;
				}
				if (y + 222 >= legalsOffset && y + 222 <= legalsOffset + legalsDivHeight) {
					isActiveLegalsMobile = text.id;
				}
			}
		}
	});

	function getOffsetTop(div: string) {
		let need: any;
		need = document.getElementById(div);

		let offsetTop = 0;
		while (need) {
			offsetTop += need.offsetTop;
			need = need.offsetParent;
		}

		return offsetTop;
	}

	function scrollToDiv(div: string) {
		const offsetTop = getOffsetTop(div);
		const heightHeader = window.innerWidth < 1024 ? 222 : 96;

		window.scrollTo({
			top: offsetTop - heightHeader,
			behavior: 'smooth'
		});
	}
</script>

<svelte:window bind:scrollY={y} />

<div class="max-lg:hidden lg:h-[96px]" />

{#if content.texts}
	<div
		class="sticky top-[70px] flex w-full flex-nowrap gap-[16px] border-b border-solid border-shark border-opacity-20 bg-white pt-[56px] max-lg:px-[16px] lg:hidden"
	>
		{#each content.texts as text}
			<h2
				class="pb-[14px] text-m2 font-black font-champ tracking-[0.05rem] {isActiveLegalsMobile === text.id
					? "relative text-shark before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[1px] before:w-full before:bg-shark before:content-['']"
					: 'text-silver'}"
				on:click|preventDefault={() =>
					scrollToDiv(text.id + '-' + text.title.split(' ')[0].toLowerCase())}
			>
				{text.mobileTitle ? text.mobileTitle : text.title}
			</h2>
		{/each}
	</div>

	<div
		class="flex justify-between pb-[56px] max-lg:mt-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
	>
		<div class="relative flex flex-1 flex-col max-lg:hidden">
			<div class="sticky top-[96px]">
				{#each content.texts as text}
					<h2
						class="cursor-pointer text-medium font-black font-champ tracking-[0.05rem] hover:text-shark lg:w-1/2 {isActiveLegals ===
						text.id
							? 'text-shark'
							: 'text-silver'}"
						on:click|preventDefault={() =>
							scrollToDiv(text.id + '-' + text.title.split(' ')[0].toLowerCase())}
					>
						{@html text.title}
					</h2>
				{/each}
			</div>
		</div>
		<div class="flex flex-1 flex-col gap-[56px] max-lg:px-[16px] lg:gap-[96px]">
			{#each content.texts as text}
				<div id={text.id + '-' + text.title.split(' ')[0].toLowerCase()}>
					<h2
						class="mb-[32px] text-[24px] font-black font-champ tracking-[0.05rem] max-lg:leading-[32px] lg:text-[32px]"
					>
						{text.title}
					</h2>
					<div class="content-legal">
						<SvelteMarkdown source={text.text} options={mdOptions} />
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
