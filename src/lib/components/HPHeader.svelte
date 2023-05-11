<script lang="ts">
	import { onMount } from 'svelte';

	import type Project from '$lib/interface/project';
	import CtaArrow from '$lib/assets/svg/CTAArrow.svelte';

	let actualProject: Project;

	export let projects: Array<any> = [];

	onMount(() => {
		setProject(projects[0], 0);
	});

	function setProject(project: any, i: number) {
		actualProject = {
			mediaDesktopSrc: project.mediaDesktop.data.attributes.url,
			mediaMobileSrc: project.mediaMobile.data.attributes.url,
			mediaDesktopAlt: project.mediaDesktop.data.attributes.alternativeText
				? project.mediaDesktop.data.attributes.alternativeText
				: project.title,
			mediaMobileAlt: project.mediaMobile.data.attributes.alternativeText
				? project.mediaMobile.data.attributes.alternativeText
				: project.title,
			mediaDesktopMime: project.mediaDesktop.data.attributes.mime,
			mediaMobileMime: project.mediaMobile.data.attributes.mime,
			title: project.title,
			slug: project.slug,
			id: i
		};
	}
</script>

{#if actualProject}
	<div
		class="relative mb-[56px] flex h-[calc(100vh-70px)] w-full max-lg:flex-col lg:mb-[96px] lg:h-screen lg:items-center lg:pl-[48px]"
	>
		<a
			href={actualProject.slug}
			title={actualProject.title}
			class="h-full w-full max-lg:flex-1 lg:absolute lg:inset-0"
		>
			<div
				class="absolute inset-y-0 left-0 h-full w-2/5 bg-gradient-to-r from-black opacity-5 max-lg:hidden"
			/>
			{#if actualProject.mediaDesktopMime.includes('image')}
				<img
					src={actualProject.mediaDesktopSrc}
					alt={actualProject.mediaDesktopAlt}
					class="h-full w-full object-cover max-lg:hidden"
				/>
			{/if}
			{#if actualProject.mediaMobileMime.includes('image')}
				<img
					src={actualProject.mediaMobileSrc}
					alt={actualProject.mediaMobileAlt}
					class="h-full w-full object-cover lg:hidden"
				/>
			{/if}
			{#if actualProject.mediaDesktopMime.includes('video')}
				<video
					class="h-full w-full object-cover max-lg:hidden"
					loop
					muted
					id="video"
					preload="metadata"
					playsinline
					autoplay
					controls={false}
				>
					<source
						src={actualProject.mediaDesktopSrc}
						type="video/mp4"
						media="(min-width: 1024px)"
					/>
				</video>
			{/if}
			{#if actualProject.mediaMobileMime.includes('video')}
				<video
					class="h-full w-full object-cover lg:hidden"
					loop
					muted
					id="video"
					preload="metadata"
					playsinline
					autoplay
					controls={false}
				>
					<source src={actualProject.mediaMobileSrc} type="video/mp4" media="(max-width: 1023px)" />
				</video>
			{/if}
		</a>
		<ul class="relative z-20 flex flex-col max-lg:px-[16px] max-lg:py-[32px] lg:gap-4">
			{#each projects as project, i}
				<li class="max-lg:relative max-lg:pr-[32px]">
					<p
						class="cursor-pointer text-[4.8rem] font-bold leading-none -tracking-[0.03em] transition-colors hover:opacity-100 lg:inline-block lg:text-[7.2rem] lg:font-medium lg:text-white {project.title ===
						actualProject.title
							? 'text-shark lg:opacity-100'
							: 'text-silver lg:opacity-40'}"
						on:click|preventDefault={() => setProject(project, i)}
					>
						{project.title}
					</p>
					{#if project.title === actualProject.title}
						<a
							class="absolute inset-0 z-10 flex h-full w-full items-center justify-end lg:hidden"
							href={actualProject.slug}
							title={actualProject.title}
						>
							<CtaArrow newClass="w-[16px] h-[16px]" />
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
