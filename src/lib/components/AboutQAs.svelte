<script lang="ts">
  import AboutQA from '$lib/components/AboutQA.svelte';
  import LDTag from '$lib/components/utilities/LDTag.svelte'

  export let qas: Array;

  let faqsSchema: Array<any> = []
	for (let i = 0; i < qas.length; i++) {
		const faq: any = qas[i];
		const newFaq: any = {
			"@type": "Question",
			"name": faq.title.replace(/&nbsp;/g, ' '),
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.text
			}
		}
		faqsSchema.push(newFaq)
	}

	const schema = {
    '@context': 'https://schema.org',
		'@type': 'FAQPage',
		"mainEntity": faqsSchema
	}
</script>

<LDTag {schema} />

<div class="pb-[56px] lg:pb-[96px] px-[16px] lg:px-[48px] flex flex-col">
  {#each qas as qa}
  <AboutQA {qa} />
  {/each}
</div>