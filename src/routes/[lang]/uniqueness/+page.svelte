<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	import gsap from 'gsap'
	import ScrollTrigger from "gsap/dist/ScrollTrigger";

	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

	const strapiURL = import.meta.env.VITE_STRAPI_URL;
	let content: any;

	$: content = $page.data.content;

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};

	onMount(() => {
		if(typeof window !== "undefined"){
			gsap.registerPlugin(ScrollTrigger)
		}

		const scroller = document.body;

		ScrollTrigger.defaults({ 
			scroller: scroller,
			pinType: 'transform'
		});
		
		const timeline1 = gsap.timeline({
			scrollTrigger: {
        trigger: '.title',
        start: 'top top',
        end: '+=250%',
        scrub: true,
        pin: true,
        anticipatePin: 1
			}
		})
		timeline1.to('.title p', { duration: 0.5, x: '-105%' })
		timeline1.to('.title', { duration: 0.1, opacity: 0 }, 'end')
		timeline1.to('.content', { duration: 0.15, y: '-50%' }, 'end')
		timeline1.to('.title p', { duration: 0.15, y: '-300px' }, 'end')
	});

	onDestroy(() => {
		if(typeof window !== "undefined"){
			gsap.registerPlugin(ScrollTrigger)
		}
		
		if (ScrollTrigger) {
			let triggers = ScrollTrigger.getAll();
			triggers.forEach( trigger => {			
				trigger.kill();
			});
		}
	})
</script>

<div class="title h-screen flex justify-center items-center overflow-x-hidden">
	<div class="max-lg:pl-[16px] flex flex-nowrap gap-[26px] pl-[48px] w-full">
		<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
		<p class="text-[60px] font-medium -tracking-[0.03em] lg:text-[212px]">{content.title}</p>
	</div>
</div>

<div class="content relative -top-2/4">
	<div class="mb-[56px] gap-[48px] px-[48px] max-lg:px-[16px] lg:mb-[96px] lg:grid lg:grid-cols-5">
		<div class="col-span-1 max-lg:hidden" />
		<div
			class="flex flex-col gap-[154px] text-[32px] leading-[36px] -tracking-[0.03em] lg:col-span-3 lg:gap-[112px] lg:text-[40px] lg:leading-[46px]"
		>
			<SvelteMarkdown source={content.text} options={mdOptions} />
		</div>
	</div>
	
	{#if content.img && content.img.data}
		<div class="max-lg:mb-[56px] max-lg:h-[360px] lg:mb-[-60%]">
			<img
				src={strapiURL + content.img.data.attributes.url}
				alt={content.img.data.attributes.alternativeText
					? content.img.data.attributes.alternativeText
					: content.title}
				class="w-full max-lg:h-full max-lg:object-cover lg:h-auto"
			/>
		</div>
	{/if}
</div>