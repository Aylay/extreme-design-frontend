<script lang="ts">
	import { onMount } from 'svelte';

	import type Project from '$lib/interface/project';

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
	<div class="relative flex h-screen w-full items-center pl-[48px] mb-[56px] lg:mb-[96px]">
		<a href={actualProject.slug} title={actualProject.title} class="absolute inset-0 h-full w-full">
			<div class="absolute inset-y-0 left-0 h-full w-2/5 bg-gradient-to-r from-black opacity-5" />
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
			{#if actualProject.mediaDesktopMime.includes('video') || actualProject.mediaMobileMime.includes('video')}
				<video
					class="h-full w-full object-cover"
					loop
					muted
					id="video"
					preload="metadata"
					playsinline
					autoplay
					controls={false}
				>
					{#if actualProject.mediaDesktopMime.includes('video')}
						<source
							src={actualProject.mediaDesktopSrc}
							type="video/mp4"
							media="(min-width: 1024px)"
						/>
					{/if}
					{#if actualProject.mediaMobileMime.includes('video')}
						<source
							src={actualProject.mediaMobileSrc}
							type="video/mp4"
							media="(max-width: 1023px)"
						/>
					{/if}
				</video>
			{/if}
		</a>
		<ul class="relative z-20 flex flex-col gap-4">
			{#each projects as project, i}
				<li>
					<p
						class="cursor-pointer lg:text-[7.2rem] lg:font-medium leading-none -tracking-[0.03em] text-white transition-colors hover:opacity-100 {project.title ===
						actualProject.title
							? 'opacity-100'
							: 'opacity-40'}"
						on:click|preventDefault={() => setProject(project, i)}
					>
						{project.title}
					</p>
				</li>
			{/each}
		</ul>
	</div>
{/if}
