<script lang="ts">
	import { page } from '$app/stores';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	export let project: any = '';
	export let projectsLength = 0;

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let actualLang: any;

	$: {
		actualLang = $page.data.actualLang;
	}
</script>

<a
	href={project.slug.includes('http') ? project.slug : actualLang + project.slug}
	title={project.title}
	target={project.slug.includes('http') ? '_blank' : ''}
	class="flex flex-col gap-[16px]"
	use:inview={options}
	on:inview_change={handleChange}
>
<div class="w-full {projectsLength === 1 ? 'max-lg:h-[360px]' : ''}">
	{#if isInView}
		{#if project.img.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + project.img.data.attributes.url}
				alt={project.img.data.attributes.alternativeText
					? project.img.data.attributes.alternativeText
					: project.title}
				class="w-full rounded-[2.2rem] overflow-hidden {isInView ? 'animate-fade' : 'opacity-0'} {projectsLength === 1 ? 'max-lg:h-full max-lg:object-cover' : ''}"
			/>
		{/if}
		{#if project.img.data.attributes.mime.includes('video')}
			<video
				class="h-auto w-full rounded-[2.2rem] overflow-hidden {isInView ? 'animate-fade' : 'opacity-0'} {projectsLength === 1 ? 'max-lg:h-full max-lg:object-cover' : ''}"
				loop
				muted
				playsinline
				autoplay
				controls={false}
				src={strapiURL + project.img.data.attributes.url}
			>
				<source src={strapiURL + project.img.data.attributes.url} type="video/mp4" />
			</video>
		{/if}
	{/if}
</div>
	<h4
		class="text-[2.4rem] font-black font-champ tracking-[0.05rem]"
	>
		{project.title}
	</h4>
</a>
