<script lang="ts">
	export let src: string;
	export let alt: string;
	export let imgClass: string;

	import { onMount } from 'svelte';

	let loaded = false;
	let thisImage: any;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<img
	{src}
	{alt}
	class="transition-opacity duration-500 {loaded ? 'opacity-100' : 'opacity-0'} {imgClass}"
	class:loaded
	bind:this={thisImage}
	loading="lazy"
/>
