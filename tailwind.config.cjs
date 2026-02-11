/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFF',
			black: '#000',
			shark: '#222728',
			silver: '#C2C1C1',
			transparent: 'transparent',
			punch: '#DE4422',
			yellow: '#E2F750',
			beige: '#E9E6DF'
		},
		fontFamily: {
			base: 'basis_grotesque_arabic_pro, Arial, sans-serif',
			champ: 'champ, Arial, sans-serif'
		},
		fontSize: {
			big: [
				'13rem',
				{
					lineHeight: '12.4rem',
					letterSpacing: '-0.03em'
				}
			],
			medium: ['4.2rem', '4.6rem'],
			m1: [
				'3.2rem',
				{
					lineHeight: '3.2rem',
					letterSpacing: '-0.03em',
					fontWeight: '500'
				}
			],
			m2: [
				'1.8rem',
				{
					lineHeight: '2.4rem',
					letterSpacing: '-0.03em'
				}
			]
		},
		extend: {
			animation: {
				unfade: 'unfade 1s both'
			},
			keyframes: {
				unfade: {
					from: {
						opacity: 100
					},
					to: {
						opacity: 0
					}
				}
			}
		}
	},
	safelist: ['grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
	plugins: [require('tailwindcss-animated')]
};
