<script lang="ts">
	import { onMount } from 'svelte';

	interface Project {
		mediaDesktopSrc: string;
		mediaDesktopAlt: string;
		mediaDesktopMime: string;
		mediaMobileSrc: string;
		mediaMobileAlt: string;
		mediaMobileMime: string;
		title: string;
		slug: string;
		id: number;
	}

	let actualProject: Project;

	const projects = [
		{
			title: 'Schweppes',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'ccc',
						mime: 'imagesdqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		},
		{
			title: 'Monoprix',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/showreel-desktop.mp4',
						alternativeText: 'ccc',
						mime: 'videoqdsfqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		}
	];

  onMount(() => {
    setProject(projects[0], 0)
    console.log(actualProject)
  })

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
<div class="relative h-screen w-full flex pl-[48px] items-center">
	<a href={actualProject.slug} title={actualProject.title} class="absolute w-full h-full inset-0">
    <div class="absolute h-full w-2/5 inset-y-0 left-0 bg-gradient-to-r from-black opacity-5">
    </div>
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
      class="w-full h-full object-cover"
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
        class="cursor-pointer font-medium text-[7.2rem] -tracking-[0.03em] leading-none text-white transition-colors hover:opacity-100 {project.title === actualProject.title ? 'opacity-100' : 'opacity-40'}"
        on:click|preventDefault={() => setProject(project, i)}
      >{project.title}</p>
    </li>
    {/each}
  </ul>
</div>
{/if}
