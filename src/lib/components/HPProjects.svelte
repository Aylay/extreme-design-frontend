<script lang="ts">
  export let projectsList: Array<any> = []
</script>

<div class="flex flex-col gap-[48px] pb-[56px] lg:pb-[96px]">
  {#each projectsList as projects}
    <div class="{projects.length > 1 ? 'grid px-[16px] gap-[48px] lg:px-[48px] grid-cols-' + projects.length : ''}">
      {#each projects as project}
        <a
          href={project.slug}
          title={project.title}
          class="flex flex-col gap-[16px]"
        >
          <img src={project.img.data.attributes.url} alt={project.img.data.attributes.alternativeText ? project.img.data.attributes.alternativeText : project.title} class="w-full">
          <h4 class="font-medium text-[2rem] -tracking-[0.03em] {projects.length === 1 ? 'px-[16px] lg:px-[48px]' : ''}">
            {project.title}
          </h4>
        </a>
      {/each}
    </div>
  {/each}
</div>