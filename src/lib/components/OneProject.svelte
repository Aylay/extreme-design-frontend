<script lang="ts">
	import { page } from '$app/stores';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};
	const strapiURL = import.meta.env.VITE_STRAPI_URL;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
	let actualLang: any;

$: {
	actualLang = $page.data.actualLang;
}

	export let project: any = '';
	console.log(project)
</script>

<a
	href={'/' + actualLang + project.slug}
	title={project.name}
	class="flex flex-col gap-[8px]"
	target={project.slug.includes('http') ? '_blank' : ''}
	use:inview={options}
	on:inview_change={handleChange}
>
	<h3 class="text-[2rem] font-medium -tracking-[0.03em]">
		{project.name}
	</h3>
	{#if isInView}
		<img
			src={strapiURL + project.img.data.attributes.url}
			alt={project.img.data.attributes.alternativeText
				? project.img.data.attributes.alternativeText
				: project.name}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
</a>
