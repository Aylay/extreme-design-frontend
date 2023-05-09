<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	export let project: any = '';
</script>

<a
	href={'/projets' + project.slug}
	title={project.title}
	class="flex flex-col gap-[8px]"
	use:inview={options}
	on:inview_change={handleChange}
>
<h3
  class="text-[2rem] font-medium -tracking-[0.03em]"	>
  {project.title}
</h3>
	{#if isInView}
		<img
			src={project.img.data.attributes.url}
			alt={project.img.data.attributes.alternativeText
				? project.img.data.attributes.alternativeText
				: project.title}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
</a>
