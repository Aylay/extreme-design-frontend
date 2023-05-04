<script lang="ts">
	interface aboutNumber {
		text1: string;
		text2: string;
	}
	export let numbers: Array<aboutNumber> = [];
</script>

<div class="max-lg:grid max-lg:grid-cols-2 lg:flex justify-between gap-y-[72px] gap-x-[16px] lg:gap-[48px] px-[16px] lg:px-[48px] pb-20 lg:pb-[96px]">
	{#each numbers as number}
		<div class="flex flex-1 flex-col gap-[12px]">
			<p class="font-medium text-medium">{number.text1}</p>
			<p class="max-lg:text-m2 lg:text-[2rem] lg:leading-[32px] -tracking-[0.03em]">{number.text2}</p>
		</div>
	{/each}
</div>
