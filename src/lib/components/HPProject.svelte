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
	{#if isInView}
		{#if project.img.data.attributes.mime.includes('image')}
			<img
				src={strapiURL + project.img.data.attributes.url}
				alt={project.img.data.attributes.alternativeText
					? project.img.data.attributes.alternativeText
					: project.title}
				class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
			/>
		{/if}
		{#if project.img.data.attributes.mime.includes('video')}
			<video
				class="h-auto w-full {isInView ? 'animate-fade' : 'opacity-0'}"
				loop
				muted
				playsinline
				autoplay
				controls={false}
			>
				<source src={strapiURL + project.img.data.attributes.url} type="video/mp4" />
			</video>
		{/if}
	{/if}
	<h4
		class="text-[2rem] font-medium -tracking-[0.03em] {projectsLength === 1
			? 'px-[16px] lg:px-[48px]'
			: ''}"
	>
		{project.title}
	</h4>
</a>
