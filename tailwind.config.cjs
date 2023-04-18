/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFF',
			black: '#000',
			shark: '#222728',
			silver: '#C2C1C1',
			transparent: 'transparent'
		},
		fontFamily: {
			base: 'basis_grotesque_arabic_pro, Arial, sans-serif'
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
	plugins: [require('tailwindcss-animated')]
};
