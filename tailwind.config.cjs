/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFF',
			black: '#000',
			parchment: '#F1EDE6',
			gold: '#8D6708',
			hessian: '#D7D2C5',
			cherry: '#D6C4B3',
			roast: '#C8BFB5',
			mist: '#B9B6B1',
			leaf: '#C4C5AB',
			crema: '#E9DFBC',
			earth: '#CBB79E',
			transparent: 'transparent',
			'antique-bronze': '#715206'
		},
		fontFamily: {
			base: 'NespressoLucas, Helvetica, Arial, sans-serif'
		},
		fontSize: {
			h1: [
				'5rem',
				{
					lineHeight: '6rem',
					fontWeight: '800'
				}
			],
			'h1-m': [
				'3rem',
				{
					lineHeight: '3.6rem',
					fontWeight: '800'
				}
			],
			h2: [
				'4rem',
				{
					lineHeight: '4.8rem',
					fontWeight: '800'
				}
			],
			'h2-m': [
				'2.5rem',
				{
					lineHeight: '3rem',
					fontWeight: '800'
				}
			],
			h3: [
				'2.4rem',
				{
					lineHeight: '2.9rem',
					fontWeight: '800'
				}
			],
			'h3-m': [
				'1.8rem',
				{
					lineHeight: '2.2rem',
					fontWeight: '800'
				}
			],
			h4: [
				'1.2rem',
				{
					lineHeight: '1.4rem',
					fontWeight: '800'
				}
			],
			l: [
				'2rem',
				{
					lineHeight: '2.4rem'
				}
			],
			m: [
				'1.6rem',
				{
					lineHeight: '1.9rem'
				}
			],
			'm-m': [
				'1.7rem',
				{
					lineHeight: '2rem'
				}
			],
			s: [
				'1.2rem',
				{
					lineHeight: '1.4rem'
				}
			],
			'n2-m': [
				'1.4rem',
				{
					lineHeight: '1.7rem'
				}
			]
		},
		animation: {
			spin: 'spin 10s linear infinite'
		}
	},
	plugins: [require('tailwindcss-animated')]
};
