<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';

	import AboutContentImg from '$lib/components/AboutContentImg.svelte';
	import AboutImgLinks from '$lib/components/AboutImgLinks.svelte';
	import Intro from '$lib/components/common/Intro.svelte';
	import Numbers from '$lib/components/common/Numbers.svelte';
	import TitleText from '$lib/components/common/TitleText.svelte';
	import SliderImg from '$lib/components/common/SliderImg.svelte';
	import AboutTeam from '$lib/components/AboutTeam.svelte';
	import ContactUs from '$lib/components/common/ContactUs.svelte';

	let isInView: boolean;
	const options: Options = {
		unobserveOnEnter: true,
		rootMargin: '50px'
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};

	const aboutNumbers = [
		{
			text1: '22',
			text2: 'Années d’existence'
		},
		{
			text1: '100%',
			text2: 'Intégrée & Indépendante'
		},
		{
			text1: '60',
			text2: 'Collaborateurs'
		},
		{
			text1: '1770',
			text2: 'Combinaisons d’équipes possibles'
		}
	];

	const theCta = {
		href: '#',
		label: 'projets',
		title: 'coucou'
	};

	const cities = [
		{
			name: 'Paris',
			img: {
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Lyon',
			img: {
				data: {
					attributes: {
						url: '/img/cas1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'São Polo',
			img: {
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'London',
			img: {
				data: {
					attributes: {
						url: '/img/cas1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		}
	];

	const rse = {
		title: 'Just<br />Inclusive<br />Ethic',
		subtitle: 'Make it good',
		cta: {
			href: '#',
			title: 'Découvrir notre charte RSE',
			label: 'Découvrir notre charte RSE'
		},
		img: {
			data: {
				attributes: {
					url: '/img/cas.jpg',
					alternativeText: 'coucou'
				}
			}
		}
	};

	const sliderImages = [
		{
			data: {
				attributes: {
					url: '/img/cas.jpg',
					alternativeText: 'coucou'
				}
			}
		},
		{
			data: {
				attributes: {
					url: '/img/cas1.jpg',
					alternativeText: 'coucou'
				}
			}
		},
		{
			data: {
				attributes: {
					url: '/img/logo-extreme.jpg',
					alternativeText: 'coucou'
				}
			}
		},
		{
			data: {
				attributes: {
					url: '/img/cas.jpg',
					alternativeText: 'coucou'
				}
			}
		},
		{
			data: {
				attributes: {
					url: '/img/logo-extreme.jpg',
					alternativeText: 'coucou'
				}
			}
		},
		{
			data: {
				attributes: {
					url: '/img/cas.jpg',
					alternativeText: 'coucou'
				}
			}
		}
	];

	const team = [
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member2.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member2.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member2.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		},
		{
			name: 'Anne Hidalgo',
			job: 'lol',
			img: {
				data: {
					attributes: {
						url: '/img/member1.jpg',
						alternativeText: 'coucou'
					}
				}
			}
		}
	];
</script>

<Intro text="Agilité, écoute, fraîcheur, poil à gratter, simplicité, exigence" />

<div
	class="mb-[56px] max-lg:h-[360px] lg:mb-[96px]"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInView}
		<img
			src="/img/cas.jpg"
			alt="A REMPLIR"
			class=" w-full max-lg:h-full max-lg:object-cover lg:h-auto {isInView
				? 'animate-fade'
				: 'opacity-0'}"
		/>
	{/if}
</div>

<Numbers numbers={aboutNumbers} />

<TitleText
	title="Expertises"
	text="Consumer Insight/Research/User Lab/Innovation/Stratégie/Brand Platform/Trends/Copy Writing/Story Telling/Naming/Consumer branding/Corporate branding/Brand Design/Identity/Packaging/Film & Motion/Digital/Structural design/Production"
	cta={theCta}
/>

<AboutImgLinks {cities} />

<AboutContentImg content={rse} />

<SliderImg images={sliderImages} />

<h3
	class="mb-[16px] px-[16px] max-lg:text-m1 lg:mb-[48px] lg:px-[48px] lg:text-medium lg:font-medium"
>
	La team
</h3>

<AboutTeam {team} />

<ContactUs />
