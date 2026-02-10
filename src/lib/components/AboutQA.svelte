<script lang="ts">
  export let qa: any;
  let isOpened: boolean = false;
</script>

<div class="border-b border-solid border-shark first:border-t py-[32px]">
  <button
    class="flex items-center gap-[16px] lg:gap-[48px] w-full"
    on:click={() => isOpened = !isOpened}
  >
    <div class="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px] relative before:w-full before:h-[2px] before:bg-black before:absolute before:top-1/2 before:inset-x-0 before:-translate-y-1/2 after:h-full after:w-[2px] after:bg-black after:absolute after:left-1/2 after:inset-y-0 after:-translate-x-1/2 after:transition-opacity {isOpened ? 'after:opacity-0 ' : 'after:opacity-100'}" />
    <h4 class="flex-1 text-[24px] text-left max-lg:leading-[32px] lg:text-[32px] font-black font-champ tracking-[0.05rem]">{qa.title}</h4>
  </button>
  <div class="lg:pl-[64px] text-[18px] leading-[26px] lg:text-[24px] lg:leading-[32px] w-full transition-all {isOpened ? 'opacity-100 visible h-auto mt-[16px]' : 'opacity-0 invisible h-0'}">
    {@html qa.text}
  </div>
</div>