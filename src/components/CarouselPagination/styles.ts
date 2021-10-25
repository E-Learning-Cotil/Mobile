import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		// height: 30,
		// marginBottom: 0,
	},

	dot: {
		width: 95,
		height: 20,
		borderRadius: 10,

		justifyContent: 'center',
		alignItems: 'center',

		paddingHorizontal: 8,
		marginHorizontal: 8,
	},

	text: {
		textAlign: 'center',
		textAlignVertical: 'center',

		fontFamily: theme.fonts.text700,
		color: '#FFF',
		fontSize: 15,
		lineHeight: 18,
	},

	inactiveDot: {
		width: 65,
		height: 10,
		borderRadius: 5,

		opacity: 0.5,

		marginHorizontal: 10,
	},
});