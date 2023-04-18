<script lang="ts">
	export let src: string;
	export let alt: string;
	export let divClass: string = '';
	export let imgClass: string = 'w-full h-auto';

	import IntersectionObserver from './IntersectionObserver.svelte';
	import Image from './Image.svelte';

	let nativeLoading = false;

	// Determine whether to bypass our intersecting check
	// onMount(() => {
	//   if ('loading' in HTMLImageElement.prototype) {
	//     nativeLoading = true
	//   }
	// })
</script>

<IntersectionObserver {divClass} once={true} let:intersecting>
	{#if intersecting || nativeLoading}
		<Image {alt} {src} {imgClass} />
	{/if}
</IntersectionObserver>
