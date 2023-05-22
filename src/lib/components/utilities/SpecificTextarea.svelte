<script lang="ts">
	export let error = false;
	export let content: string;
	export let value = '';
	export let required = false;

	let textArea: HTMLTextAreaElement;

	function auto_grow(elm: any) {
		elm.style.height = elm.scrollHeight + 'px';
	}
</script>

<textarea
	bind:this={textArea}
	bind:value
	id={content}
	placeholder={required ? content + '*' : content}
	on:focus={() => (error = false)}
	on:keypress={() => auto_grow(textArea)}
	on:keyup={() => auto_grow(textArea)}
	class="h-[53px] w-full resize-none overflow-hidden border-b border-solid border-shark pb-[16px] text-[24px] focus-within:outline-none {error
		? 'text-punch placeholder:text-punch'
		: 'text-shark placeholder:text-opacity-40'}"
/>
