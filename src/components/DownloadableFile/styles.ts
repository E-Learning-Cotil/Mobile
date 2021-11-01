import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 46,

		backgroundColor: theme.colors.white,

		borderRadius: 16,

		marginBottom: 16,
	},

	button: {
		flex: 1,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	column: {},

	text: {
		paddingLeft: 12,
		paddingRight: 24,
	},

	title: {
		fontFamily:theme.fonts.title400,
		color: theme.colors.background,
		fontSize: 18,
	},

	contentDiv: {
		marginLeft: '5%',
		flexDirection: 'row',
		width: '70%',
	},

	skeleton: {		
		backgroundColor: theme.colors.gray90,
		
		borderRadius: 16,

		marginVertical: 8,
	},

	iconDiv: {
		borderRadius: 16,
		width: '25%',
		backgroundColor: theme.colors.gray70,
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
	}
});