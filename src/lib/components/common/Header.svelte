<script lang="ts">
	import Logo from '../../assets/svg/Logo.svelte';
	import Hoverable from '../utilities/Hoverable.svelte';

	import { navigating, page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	let menuOpened = false;
	let y: number;
	let isWhite: boolean = $page.data.imageHeader;
	let isProject: boolean = $page.params.slug ? true : false;

	let content: any;
	let actualLang: any;
	let allLangsContent: any;
	let restOfUrl: string;

	$: {
		content = $page.data.layoutContent;
		actualLang = $page.data.actualLang;
		allLangsContent = $page.data.allLangsContent;
		restOfUrl = $page.data.restOfUrl;
		isWhite = $page.data.imageHeader;
		isProject = $page.params.slug ? true : false;
	}

	afterUpdate(() => {
		const yChange = isProject ? window.innerHeight - 130 : window.innerHeight
		if ($navigating) {
			menuOpened = false;
		}

		if ($page.data.imageHeader) {
			if (y > yChange) {
				isWhite = false;
			}
			if (isWhite === false && y <= yChange) {
				isWhite = true;
			}
		}
	});
</script>

<svelte:window bind:scrollY={y} />

{#if content}
	<div
		class="{isWhite
			? 'bg-white lg:bg-transparent'
			: 'bg-white'} transitions-colors sticky inset-x-0 top-0 z-30 w-full px-[1.6rem] lg:fixed lg:px-[4.8rem]"
	>
		<div class="relative flex items-center max-lg:justify-between">
			<a class="inline-block" href="/{actualLang}" title="extreme design">
				<Logo
					newClass="max-w-[20.5rem] w-full h-auto max-lg:hidden transition-colors {isWhite
						? 'fill-white'
						: 'fill-shark'}"
				/>
				<Logo newClass="max-w-[15rem] w-full h-auto lg:hidden fill-shark" />
			</a>
			<div class="py-9 lg:hidden">
				<div class="relative h-10 w-10" on:click={() => (menuOpened = !menuOpened)}>
					<span
						class="absolute inset-x-0 h-[3px] w-full bg-shark transition-all duration-300 {menuOpened
							? 'top-1/2 -translate-y-1/2 rotate-45'
							: 'top-[6px]'}"
					/>
					<span
						class="absolute inset-x-0 h-[3px] w-full bg-shark duration-300 {menuOpened
							? 'top-1/2 -translate-y-1/2 -rotate-45'
							: 'bottom-[6px]'}"
					/>
				</div>
			</div>
			<div class="flex-1 max-lg:hidden relative">
				<Hoverable let:hovering={active}>
					<div
						class="flex w-full cursor-pointer justify-end py-9 {active
							? 'animate-unfade animate-duration-100'
							: 'animate-fade'}"
					>
						<div class="relative h-10 w-10">
							<span
								class="absolute inset-x-0 top-[6px] h-[3px] w-full transition-colors {isWhite
									? 'bg-white'
									: 'bg-shark'}"
							/>
							<span
								class="absolute inset-x-0 bottom-[6px] h-[3px] w-full transition-colors {isWhite
									? 'bg-white'
									: 'bg-shark'}"
							/>
						</div>
					</div>
					<div class="absolute inset-0 h-full w-full {active ? 'z-10' : '-z-10'}">
						<div
							class="absolute inset-y-0 right-[48px] flex h-full w-[calc(50%+24px)] items-center animate-duration-100 justify-between {active
								? 'animate-fade animate-delay-100'
								: 'animate-unfade'}"
						>
							<nav>
								<ul class="flex gap-6">
									{#each content.headerMenu as item}
										<li>
											<a
												class="text-[1.8rem] font-medium uppercase leading-none transition-colors {isWhite
													? 'text-white'
													: 'text-shark'}"
												title={item.title ? item.title : item.label}
												target={item.slug.includes('http') ? '_blank' : ''}
												href={item.slug.includes('http') ? item.slug : '/' + actualLang + item.slug}
											>
												{item.label}
											</a>
										</li>
									{/each}
								</ul>
							</nav>
							<ul class="flex gap-3">
								{#if allLangsContent.length > 0}
									{#each allLangsContent as lang}
										<li>
											{#if isWhite}
												<a
													class="text-[1.8rem] font-medium uppercase leading-none text-white {actualLang ===
													lang.attributes.locale
														? 'cursor-default text-opacity-100 relative before:content-[\'\'] before:w-full before:absolute before:h-[2px] before:inset-x-0 before:bottom-0 before:bg-white'
														: 'text-opacity-50'}"
													title={lang.attributes.locale}
													href={restOfUrl !== ''
														? '/' + lang.attributes.locale + '/' + restOfUrl
														: '/' + lang.attributes.locale}
												>
													{lang.attributes.locale}
												</a>
											{:else}
												<a
													class="text-[1.8rem] font-medium uppercase leading-none {actualLang ===
													lang.attributes.locale
														? 'cursor-default text-shark relative before:content-[\'\'] before:w-full before:absolute before:h-[2px] before:inset-x-0 before:bottom-0 before:bg-shark'
														: 'text-silver'}"
													title={lang.attributes.locale}
													href={restOfUrl !== ''
														? '/' + lang.attributes.locale + '/' + restOfUrl
														: '/' + lang.attributes.locale}
												>
													{lang.attributes.locale}
												</a>
											{/if}
										</li>
									{/each}
								{:else if isWhite}
									<li
										class="text-[1.8rem] font-medium uppercase leading-none text-white text-opacity-100 underline"
									>
										{allLangsContent.attributes.locale}
									</li>
								{:else}
									<li class="text-[1.8rem] font-medium uppercase leading-none text-shark underline">
										{allLangsContent.attributes.locale}
									</li>
								{/if}
							</ul>
						</div>
					</div>
				</Hoverable>
			</div>
		</div>
		{#if menuOpened}
			<div class="absolute inset-x-0 top-full w-full animate-fade-down bg-white">
				<div class="px-[16px] pb-[16px] pt-[56px]">
					<nav>
						<ul class="flex flex-col gap-[24px]">
							{#each content.headerMenu as item}
								<li>
									<a
										class="text-[1.8rem] font-medium uppercase leading-none -tracking-[0.03em] text-shark"
										title={item.title ? item.title : item.label}
										target={item.slug.includes('http') ? '_blank' : ''}
										href={item.slug.includes('http') ? item.slug : '/' + actualLang + item.slug}
									>
										{item.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
					<ul class="mt-[56px] flex gap-[24px]">
						{#if allLangsContent.length > 0}
							{#each allLangsContent as lang}
								<li>
									<a
										class="text-[1.8rem] font-medium uppercase leading-none {actualLang ===
										lang.attributes.locale
											? 'text-shark relative before:content-[] before:w-full before:absolute before:h-[2px] before:inset-x-0 before:bottom-[-8px] before:bg-shark'
											: 'text-silver'}"
										title={lang.attributes.locale}
										href={restOfUrl
											? '/' + lang.attributes.locale + '/' + restOfUrl
											: '/' + lang.attributes.locale}
									>
										{lang.attributes.locale}
									</a>
								</li>
							{/each}
						{:else}
							<li class="text-[1.8rem] font-medium uppercase leading-none text-shark underline">
								{allLangsContent.attributes.locale}
							</li>
						{/if}
					</ul>
				</div>
			</div>
		{/if}
	</div>
	{#if menuOpened}
	<div
		class="fixed inset-0 z-20 w-full h-screen animate-fade bg-white bg-opacity-75 lg:hidden"
	/>
	{/if}
{/if}
