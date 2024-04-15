<script lang="ts">
	import Hoverable from '../utilities/Hoverable.svelte';
	import ArrowCta from '$lib/assets/svg/CTAArrow.svelte';
	import SpecificInput from '../utilities/SpecificInput.svelte';

	import { page } from '$app/stores';
	let content: any = $page.data.contentContact;

	$: content = $page.data.contentContact;

	export let idForm: number;

	let company = '';

	let email = '';
	let emailError = false;

	let firstName = '';
	let firstNameError = false;

	let lastName = '';
	let lastNameError = false;

	let phone = '';

	let onError = false;

	let formSent = false;

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
			subject: '',
			phone: phone,
			message: '',
			formation: $page.route.id === '/[lang]/formation' ? true : false
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


<div class="w-full">
	{#if !formSent}
		<form class="max-lg:pb-16">
			<div class="flex flex-col gap-[24px] lg:gap-[32px]">
				<div class="flex justify-between gap-[24px] max-lg:flex-col lg:gap-[48px]">
					<SpecificInput
						error={firstNameError}
						content={content.firstNameLabel}
						bind:value={firstName}
						{idForm}
						required={true}
					/>
					<SpecificInput
						error={lastNameError}
						content={content.lastNameLabel}
						bind:value={lastName}
						{idForm}
						required={true}
					/>
				</div>
				<SpecificInput
					error={emailError}
					content={content.emailLabel}
					{idForm}
					bind:value={email}
					required={true}
				/>
				<div class="flex justify-between gap-[24px] max-lg:flex-col lg:gap-[48px]">
					<SpecificInput
						content={content.companyLabel}
						bind:value={company}
						{idForm}
					/>
					<SpecificInput
						content={content.phoneLabel}
						bind:value={phone}
						{idForm}
					/>
				</div>
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
		</div>
	{/if}
</div>
