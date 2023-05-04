<script lang="ts">
	import Logo from '../svg/Logo.svelte';
	import Hoverable from '../utilities/Hoverable.svelte';

	import { page } from '$app/stores';

	let menuOpened = false;

	const nav = [
		{
			slug: '#',
			label: 'work',
			title: 'the work'
		},
		{
			slug: '#',
			label: 'work',
			title: 'the work'
		},
		{
			slug: '#',
			label: 'work',
			title: 'the work'
		}
	];

	const langs = [
		{
			locale: 'fr',
			label: 'FR',
			title: 'lol',
			actual: true
		},
		{
			locale: 'fr',
			label: 'EN',
			title: 'lol',
			actual: false
		},
		{
			locale: 'fr',
			label: 'PT',
			title: 'lol',
			actual: false
		}
	];
</script>

<div
	class="{$page.data.imageHeader
		? 'fixed'
		: 'sticky bg-white'} inset-x-0 top-0 z-30 w-full px-[1.6rem] lg:px-[4.8rem]"
>
	<div class="relative flex items-center max-lg:justify-between">
		<a class="inline-block" href="/" title="extreme design">
			<Logo
				newClass="max-w-[15rem] lg:max-w-[20.5rem] w-full h-auto"
				color={$page.data.imageHeader ? '#FFFFFF' : '#222728'}
			/>
		</a>
		<div class="py-9 lg:hidden">
			<div class="relative h-10 w-10">
				<span
					class="absolute inset-x-0 top-[6px] h-[3px] w-full {$page.data.imageHeader
						? 'bg-white'
						: 'bg-shark'}"
				/>
				<span
					class="absolute inset-x-0 bottom-[6px] h-[3px] w-full {$page.data.imageHeader
						? 'bg-white'
						: 'bg-shark'}"
				/>
			</div>
		</div>
		<div class="flex-1 max-lg:hidden">
			<Hoverable let:hovering={active}>
				<div
					class="flex w-full cursor-pointer justify-end py-9 {active
						? 'animate-unfade animate-duration-200'
						: 'animate-fade'}"
				>
					<div class="relative h-10 w-10">
						<span
							class="absolute inset-x-0 top-[6px] h-[3px] w-full {$page.data.imageHeader
								? 'bg-white'
								: 'bg-shark'}"
						/>
						<span
							class="absolute inset-x-0 bottom-[6px] h-[3px] w-full {$page.data.imageHeader
								? 'bg-white'
								: 'bg-shark'}"
						/>
					</div>
				</div>
				<div class="absolute inset-0 h-full w-full {active ? 'z-10' : '-z-10'}">
					<div
						class="absolute inset-y-0 right-0 flex h-full w-[calc(50%-24px)] items-center justify-between {active
							? 'animate-fade animate-delay-200'
							: 'animate-unfade'}"
					>
						<nav>
							<ul class="flex gap-6">
								{#each nav as item}
									<li>
										<a
											class="text-[1.8rem] font-medium uppercase leading-none {$page.data
												.imageHeader
												? 'text-white'
												: 'text-shark'}"
											title={item.title ? item.title : item.label}
											href={item.slug}
										>
											{item.label}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
						<ul class="flex gap-3">
							{#each langs as lang}
								<li>
									{#if $page.data.imageHeader}
										<a
											class="text-[1.8rem] font-medium uppercase leading-none text-white {lang.actual
												? 'text-opacity-100 underline'
												: 'text-opacity-50'}"
											title={lang.title ? lang.title : lang.label}
											href={lang.locale}
										>
											{lang.label}
										</a>
									{:else}
										<a
											class="text-[1.8rem] font-medium uppercase leading-none {lang.actual
												? 'text-shark underline'
												: 'text-silver'}"
											title={lang.title ? lang.title : lang.label}
											href={lang.locale}
										>
											{lang.label}
										</a>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</Hoverable>
		</div>
	</div>
</div>
