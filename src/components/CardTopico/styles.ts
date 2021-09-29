import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 100,

		backgroundColor: theme.colors.gray90,

		borderRadius: 16,

		marginVertical: 5,
	},

	button: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},

	column: {},

	text: {
		paddingLeft: 12,
		paddingRight: 24,
	},

	title: {
		fontFamily:theme.fonts.title400,
		color: theme.colors.white,
		fontSize: 22,
	},

	subtitle: {
		fontFamily: theme.fonts.text400,
		color: theme.colors.highlight,
		fontSize: 18,
	},

	skeleton: {		
		backgroundColor: theme.colors.gray90,
		
		borderRadius: 16,

		marginVertical: 5,
	},
});