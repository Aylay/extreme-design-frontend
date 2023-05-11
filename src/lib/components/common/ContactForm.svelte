<script lang="ts">
	import Hoverable from '../utilities/Hoverable.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import SpecificInput from '../utilities/SpecificInput.svelte';
	import Close from '$lib/assets/svg/Close.svelte';

	export let isOpened: boolean;
	export let city: any = {
		id: 1,
		name: 'Paris',
		text: '92-98 Boulevard Victor Hugo - A2<br />92115 Clichy<br />France<br />T – 0140998050'
	};

	let subject = '';
	let subjectError = false;

	let company = '';

	let email = '';
	let emailError = false;

	let firstName = '';
	let firstNameError = false;

	let lastName = '';
	let lastNameError = false;

	let message = '';

	let onError = false;

	let formSent = false;

  function closeForm() {
    document.body.classList.remove('overflow-hidden')
    isOpened = false
  }

	function addProspect() {
		checkFormError();
		if (onError) {
			return;
		}

		formSent = true;
	}

	function checkFormError() {
		onError = false;
		firstNameError = false;
		lastNameError = false;
		emailError = false;
		subjectError = false;

		if (subject === '') {
			onError = true;
			subjectError = true;
		}

		if (firstName === '') {
			onError = true;
			firstNameError = true;
		}

		if (lastName === '') {
			onError = true;
			lastNameError = true;
		}

		if (email === '' || (email !== '' && !validEmail(email))) {
			onError = true;
			emailError = true;
		}
	}

	function validEmail(email: string) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
</script>

<div class="fixed inset-0 flex justify-end h-screen z-50 w-full animate-fade bg-white bg-opacity-75">
  <div
    class="flex items-center justify-center lg:border-l border-solid border-shark border-opacity-[0.15] bg-white max-lg:px-[16px] pl-[48px] w-full lg:w-[calc(50%+24px)] lg:pr-[calc(100%/12+48px)]"
  >
    <div
      class="absolute right-[16px] lg:right-[24px] top-[24px] flex cursor-pointer items-center gap-[24px]"
      on:click|preventDefault={closeForm}
    >
      <p class="pt-[3px] text-[14px] font-bold uppercase -tracking-[0.03em]">Fermer</p>
      <Close />
    </div>
    <div class="w-full">
      {#if !formSent}
        <h3 class="mb-[56px] lg:mb-[120px] text-m1 font-normal lg:text-medium">Contacter <span class="max-lg:block">{city.name}</span></h3>
        <form>
          <div class="flex flex-col gap-[24px] lg:gap-[32px]">
            <SpecificInput
              error={subjectError}
              content="Sujet"
              bind:value={subject}
              required={true}
            />
            <div class="flex max-lg:flex-col justify-between gap-[24px] lg:gap-[48px]">
              <SpecificInput content="Entreprise" bind:value={company} />
              <SpecificInput error={emailError} content="E-mail" bind:value={email} required={true} />
            </div>
            <div class="flex max-lg:flex-col justify-between gap-[24px] lg:gap-[48px]">
              <SpecificInput
                error={firstNameError}
                content="Prénom"
                bind:value={firstName}
                required={true}
              />
              <SpecificInput
                error={lastNameError}
                content="Nom"
                bind:value={lastName}
                required={true}
              />
            </div>
            <SpecificInput content="Message" bind:value={message} />
          </div>
  
          <div class="mt-[96px] lg:mt-[80px] flex">
            <Hoverable let:hovering={active}>
              <button
                class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
                on:click|preventDefault={addProspect}
              >
                <div class="flex items-center gap-[24px] lg:gap-[32px]">
                  <span
                    class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
                  >
                    Envoyer
                  </span>
                  <ArrowCta />
                </div>
                <div
                  class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
                    ? 'w-[1px]'
                    : 'w-full'}"
                />
              </button>
            </Hoverable>
          </div>
        </form>
      {:else}
        <div class="flex flex-col gap-[56px]">
          <h3 class="text-m1 font-normal lg:text-medium">Message <span class="max-lg:block">envoyé</span></h3>
          <div class="flex">
            <Hoverable let:hovering={active}>
              <div
                class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
                on:click|preventDefault={closeForm}
              >
                <div class="flex items-center gap-[24px] lg:gap-[32px]">
                  <span
                    class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
                  >
                    Revenir sur le site
                  </span>
                  <ArrowCta />
                </div>
                <div
                  class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
                    ? 'w-[1px]'
                    : 'w-full'}"
                />
              </div>
            </Hoverable>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
