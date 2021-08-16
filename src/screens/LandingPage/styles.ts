import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	title: {
		fontFamily: theme.fonts.title400,
		color: '#fff',
		fontSize: 56,

		marginBottom: '15%',
	},

	image: {
		width: 200,
		height: 200,

		marginBottom: '45%',
	},

	button: {
		width: '80%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: theme.colors.green90,
		borderRadius: 8,
	},

	buttonText: {
		fontFamily: theme.fonts.text700,
		color: '#fff',
		fontSize: 20,
	}
});