<script lang="ts">
	interface aboutNumber {
		text1: string;
		text2: string;
	}
	export let numbers: Array<aboutNumber> = [];
</script>

<div
	class="justify-between gap-x-[16px] gap-y-[72px] px-[16px] pb-[56px] max-lg:grid max-lg:grid-cols-2 lg:flex lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#each numbers as number}
		<div class="flex flex-1 flex-col gap-[12px]">
			<p class="text-medium font-medium">{number.text1}</p>
			<p class="-tracking-[0.03em] max-lg:text-m2 lg:text-[2rem] lg:leading-[32px]">
				{number.text2}
			</p>
		</div>
	{/each}
</div>
