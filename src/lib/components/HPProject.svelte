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
	export let projectsLength = 0;
</script>

<a
	href={project.slug}
	title={project.title}
	class="flex flex-col gap-[16px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		<img
			src={project.img.data.attributes.url}
			alt={project.img.data.attributes.alternativeText
				? project.img.data.attributes.alternativeText
				: project.title}
			class="w-full {isInView ? 'animate-fade' : 'opacity-0'}"
		/>
	{/if}
	<h4
		class="text-[2rem] font-medium -tracking-[0.03em] {projectsLength === 1
			? 'px-[16px] lg:px-[48px]'
			: ''}"
	>
		{project.title}
	</h4>
</a>
