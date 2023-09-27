<script lang="ts">
	import Hoverable from '../utilities/Hoverable.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import SpecificInput from '../utilities/SpecificInput.svelte';
	import SpecificTextarea from '../utilities/SpecificTextarea.svelte';
	import Close from '$lib/assets/svg/Close.svelte';
	import { page } from '$app/stores';
	let content: any;

	$: {
		content = $page.data.contentContact;
	}

	export let isOpened: boolean;

	let subject = '';
	let subjectError = false;

	let company = '';

	let email = '';
	let emailError = false;

	let firstName = '';
	let firstNameError = false;

	let lastName = '';
	let lastNameError = false;

	let phone = '';

	let message = '';

	let onError = false;

	let formSent = false;

	function closeForm() {
		document.body.classList.remove('overflow-hidden');
		isOpened = false;
	}

	function addProspect() {
		checkFormError();
		if (onError) {
			return;
		}

		const data = {
			firstName: firstName,
			lastName: lastName,
			company: company,
			email: email,
			subject: subject,
			phone: phone,
			message: message
		};

		fetch(import.meta.env.VITE_STRAPI_URL + '/api/contacts', {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

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

<div
	class="fixed inset-0 z-50 flex h-screen w-full justify-end bg-white bg-opacity-75"
	on:click|self={closeForm}
>
	<div
		class="flex w-full animate-fade-left items-center justify-center border-solid border-shark border-opacity-[0.15] bg-white pl-[48px] animate-duration-1000 max-lg:px-[16px] lg:w-[calc(50%+24px)] lg:border-l lg:pr-[48px]"
	>
		<div
			class="absolute right-[16px] top-[24px] flex cursor-pointer items-center gap-[24px] lg:right-[24px]"
			on:click|preventDefault={closeForm}
		>
			<p class="pt-[3px] text-[14px] font-bold uppercase -tracking-[0.03em]">
				{content.closeLabel}
			</p>
			<Close />
		</div>
		<div class="w-full">
			{#if !formSent}
				<h3 class="mb-[56px] text-m1 font-normal lg:mb-[120px] lg:text-medium">
					{content.contactLabel}
				</h3>
				<form>
					<div class="flex flex-col gap-[24px] lg:gap-[32px]">
						<div class="flex justify-between gap-[24px] max-lg:flex-col lg:gap-[48px]">
							<SpecificInput
								error={firstNameError}
								content={content.firstNameLabel}
								bind:value={firstName}
								required={true}
							/>
							<SpecificInput
								error={lastNameError}
								content={content.lastNameLabel}
								bind:value={lastName}
								required={true}
							/>
						</div>
						<SpecificInput
							error={emailError}
							content={content.emailLabel}
							bind:value={email}
							required={true}
						/>
						<div class="flex justify-between gap-[24px] max-lg:flex-col lg:gap-[48px]">
							<SpecificInput content={content.companyLabel} bind:value={company} />
							<SpecificInput content={content.phoneLabel} bind:value={phone} />
						</div>
						<SpecificInput
							error={subjectError}
							content={content.subjectLabel}
							bind:value={subject}
							required={true}
						/>
						<SpecificTextarea content={content.messageLabel} bind:value={message} />
					</div>

					<div class="mt-[96px] flex lg:mt-[80px]">
						<Hoverable let:hovering={active}>
							<button
								class="relative inline-block cursor-pointer pb-[8px] lg:pb-[16px]"
								on:click|preventDefault={addProspect}
							>
								<div class="flex items-center gap-[24px] lg:gap-[32px]">
									<span
										class="flex-1 py-[2px] text-[14px] font-bold uppercase leading-none -tracking-[0.03em] lg:text-[18px]"
									>
										{content.sendLabel}
									</span>
									<ArrowCta />
								</div>
								<div
									class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
										? 'w-0'
										: 'w-full'}"
								/>
							</button>
						</Hoverable>
					</div>
				</form>
			{:else}
				<div class="flex flex-col gap-[56px]">
					<h3 class="text-m1 font-normal lg:text-medium">
						{content.sentMessageLabel}
					</h3>
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
										{content.backOnTheWebsite}
									</span>
									<ArrowCta />
								</div>
								<div
									class="absolute bottom-0 left-0 h-[2px] bg-shark transition-all duration-200 {active
										? 'w-0'
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
