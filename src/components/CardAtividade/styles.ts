import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '49%',
		height: 90,

		backgroundColor: theme.colors.gray90,

		borderRadius: 16,

		marginVertical: 5,
	},

	button: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: 'space-evenly',
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	text: {
		width: '90%',
		paddingLeft: 8,

		fontFamily: theme.fonts.text400,
		color: theme.colors.white,
		fontSize: 18,
	},
});