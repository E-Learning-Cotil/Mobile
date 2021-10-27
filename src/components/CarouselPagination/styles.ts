import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		height: 60,
		marginTop: 10,
	},

	dot: {
		width: 95,
		height: 20,
		borderRadius: 10,

		justifyContent: 'center',
		alignItems: 'center',

		paddingHorizontal: 8,
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
		width: 75,
		height: 16,
		borderRadius: 8,

		marginHorizontal: 10,
	},
});