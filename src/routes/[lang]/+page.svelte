<script lang="ts">
	import HpHeader from '$lib/components/HPHeader.svelte';
	import HpProjects from '$lib/components/HPProjects.svelte';
	import TitleText from '$lib/components/common/TitleText.svelte';

	const projects = [
		{
			title: 'Schweppes',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/cas.jpg',
						alternativeText: 'ccc',
						mime: 'imagesdqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		},
		{
			title: 'Monoprix',
			slug: '#',
			mediaDesktop: {
				data: {
					attributes: {
						url: '/img/showreel-desktop.mp4',
						alternativeText: 'ccc',
						mime: 'videoqdsfqs'
					}
				}
			},
			mediaMobile: {
				data: {
					attributes: {
						url: '',
						alternativeText: '',
						mime: ''
					}
				}
			}
		}
	];

	const projectsList1: Array<any> = [
		[
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			}
		],
		[
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			}
		],
		[
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			},
			{
				title: 'Paris',
				img: {
					data: {
						attributes: {
							url: '/img/cas.jpg',
							alternativeText: 'coucou'
						}
					}
				},
				slug: '/coucou'
			}
		]
	]

const ctaUniqueness = {
	href: '#',
	label: 'uniqueness',
	title: 'uniqueness'
};
</script>

<HpHeader {projects} />

<TitleText
	title="Nous révélons les<br />marques"
	text="Nous croyons au design pour révéler ce que les marques ont de meilleur.<br />	Nos équipes sont composées sur-mesure, nos stratégies visent l’avenir.
	Notre mission est de vous rendre irrésistible !"
	cta={ctaUniqueness}
/>

<HpProjects projectsList={projectsList1} />
