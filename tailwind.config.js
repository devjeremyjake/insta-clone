module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	theme: {
		fill: (theme) => ({
			red: theme('colors.red.primary'),
		}),
		colors: {
			white: '#ffffff',
			blue: {
				medium: '#005c98',
			},
			black: {
				light: '#262626',
				faded: '#00000059',
			},
			gray: {
				base: '#616161',
				background: '#fafafa',
				primary: '#dbdbdb',
			},
			red: {
				primary: '#ed4956',
			},
		},
		extends: {
			animation: {
				bounce200: 'bounce 1s infinite 200ms',
				bounce400: 'bounce 1s infinite 400ms',
			},
		},
	},
	variants: {
		display: ['group-hover'],
	},
};
