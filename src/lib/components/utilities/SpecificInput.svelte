<script lang="ts">
	export let error = false;
	export let content: string;
	export let value = '';
	export let required = false;
</script>

<input
	bind:value
	type="text"
	id={content}
	placeholder={required ? content + '*' : content}
	on:focus={() => (error = false)}
	class="w-full border-b border-solid border-shark pb-[16px] text-[24px] focus-within:outline-none {error
		? 'text-punch placeholder:text-punch'
		: 'text-shark placeholder:text-opacity-40'}"
/>
