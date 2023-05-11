<script lang="ts">
	import { afterUpdate } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

	const mdOptions = {
		breaks: true,
		gfm: true,
		headerIds: false
	};
	let y: number;

	let isActiveLegals: number;
	let isActiveLegalsMobile: number;

	afterUpdate(() => {
		console.log(window.innerWidth);
		for (const text of texts) {
			const legalsDiv = document.getElementById(
				text.id + '-' + text.title.split(' ')[0].toLowerCase()
			);
			if (legalsDiv) {
				const legalsOffset = getOffsetTop(text.id + '-' + text.title.split(' ')[0].toLowerCase());
				const legalsDivHeight = legalsDiv.offsetHeight;
				if (y + 180 >= legalsOffset && y + 180 <= legalsOffset + legalsDivHeight) {
					isActiveLegals = text.id;
				}
				if (y + 222 >= legalsOffset && y + 222 <= legalsOffset + legalsDivHeight) {
					isActiveLegalsMobile = text.id;
				}
			}
		}
	});

	function getOffsetTop(div: string) {
		let need: any;
		need = document.getElementById(div);

		let offsetTop = 0;
		while (need) {
			offsetTop += need.offsetTop;
			need = need.offsetParent;
		}

		return offsetTop;
	}

	function scrollToDiv(div: string) {
		const offsetTop = getOffsetTop(div);
		const heightHeader = window.innerWidth < 1024 ? 222 : 96;

		window.scrollTo({
			top: offsetTop - heightHeader,
			behavior: 'smooth'
		});
	}

	const texts = [
		{
			id: 1,
			title: 'Politique de confidentialité',
			mobiletitle: 'Confidentialité',
			content:
				'### A. Introduction\nThe privacy of our website visitors is very important to us, and we are committed to safeguarding it. This policy explains what we do with your personal information.\nConsenting to our use of cookies in accordance with the terms of this policy when you first visit our website permits us to use cookies every time you visit our website.\n### B. How we collect your personal data\n### A. Introduction\nThe privacy of our website visitors is very important to us, and we are committed to safeguarding it. This policy explains what we do with your personal information.\nConsenting to our use of cookies in accordance with the terms of this policy when you first visit our website permits us to use cookies every time you visit our website.\n### B. How we collect your personal data\n### A. Introduction\nThe privacy of our website visitors is very important to us, and we are committed to safeguarding it. This policy explains what we do with your personal information.\nConsenting to our use of cookies in accordance with the terms of this policy when you first visit our website permits us to use cookies every time you visit our website.\n### B. How we collect your personal data\n### A. Introduction\nThe privacy of our website visitors is very important to us, and we are committed to safeguarding it. This policy explains what we do with your personal information.\nConsenting to our use of cookies in accordance with the terms of this policy when you first visit our website permits us to use cookies every time you visit our website.\n### B. How we collect your personal data\n'
		},
		{
			id: 2,
			title: 'Informations légales',
			mobiletitle: '',
			content:
				'## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE## Traffic\n- Sélection des experts qui répondent\nà votre problématique\n- Mise en place du planning de réalisation\nde votre projet\n- Optimisation de vos budgets\n\n## Suivi de projet\n- Cadrage et delivery projet\n- Management d’équipes opérationnelles créatives et/ou techniques\n- Suivi des allers-retours\n\n## Un pilotage tout terrain !\n- Digital & Print \n- B2C & B2B \n- Comm’ externe &  interne\n- Comm’ commerciale ou corporate\n- Comm’ RH ou RSE'
		}
	];
</script>

<svelte:window bind:scrollY={y} />

<div class="max-lg:hidden lg:h-[96px]" />

<div
	class="sticky top-[70px] flex w-full flex-nowrap gap-[16px] border-b border-solid border-shark border-opacity-20 bg-white pt-[56px] max-lg:px-[16px] lg:hidden"
>
	{#each texts as text}
		<h2
			class="pb-[14px] text-m2 font-medium {isActiveLegalsMobile === text.id
				? "relative text-shark before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[1px] before:w-full before:bg-shark before:content-['']"
				: 'text-silver'}"
			on:click|preventDefault={() =>
				scrollToDiv(text.id + '-' + text.title.split(' ')[0].toLowerCase())}
		>
			{text.mobiletitle ? text.mobiletitle : text.title}
		</h2>
	{/each}
</div>

<div
	class="flex justify-between pb-[56px] max-lg:mt-[56px] max-lg:flex-col lg:gap-[48px] lg:px-[48px] lg:pb-[96px]"
>
	<div class="relative flex flex-1 flex-col max-lg:hidden">
		<div class="sticky top-[96px]">
			{#each texts as text}
				<h2
					class="cursor-pointer text-medium font-medium hover:text-shark lg:w-1/2 {isActiveLegals ===
					text.id
						? 'text-shark'
						: 'text-silver'}"
					on:click|preventDefault={() =>
						scrollToDiv(text.id + '-' + text.title.split(' ')[0].toLowerCase())}
				>
					{@html text.title}
				</h2>
			{/each}
		</div>
	</div>
	<div class="flex flex-1 flex-col gap-[56px] max-lg:px-[16px] lg:gap-[96px]">
		{#each texts as text}
			<div id={text.id + '-' + text.title.split(' ')[0].toLowerCase()}>
				<h2
					class="mb-[32px] text-[24px] font-medium -tracking-[0.03em] max-lg:leading-[32px] lg:text-[32px]"
				>
					{text.title}
				</h2>
				<div class="content-legal">
					<SvelteMarkdown source={text.content} options={mdOptions} />
				</div>
			</div>
		{/each}
	</div>
</div>
