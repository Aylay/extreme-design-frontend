<script lang="ts">
	interface aboutNumber {
		text1: string;
		text2: string;
		percent: number;
	}
	export let numbers: Array<aboutNumber> = [];
</script>

<div
	class="justify-between gap-x-[16px] gap-y-[72px] px-[16px] pb-[56px] max-lg:grid max-lg:grid-cols-2 lg:flex lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	{#each numbers as number}
		<div class="flex flex-1 flex-col h-[50rem] p-[16px] justify-end rounded-[2.2rem] overflow-hidden relative">
			<p class="text-[10rem] font-black font-champ tracking-[0.05rem] relative z-10">{number.text1}</p>
			<p class="-tracking-[0.03em] max-lg:text-m2 lg:text-[2rem] lg:leading-[32px] w-full relative before:absolute before:left-0 before:top-0 before:w-4/5 before:h-px before:bg-black pt-[16px] z-10">
				{number.text2}
			</p>
			<div
				class="absolute w-full bottom-0 inset-x-0 bg-gradient-to-t from-yellow to-yellow/10"
				style="height: {number.percent}%"
				/>
		</div>
	{/each}
</div>
