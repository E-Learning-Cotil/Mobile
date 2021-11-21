import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 70,

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

	column: {
		paddingRight: 20,
	},

	iconView: {
		width: 40,
		height: 40,
		
		borderRadius: 5,
		
		alignItems:  'center',
		justifyContent: 'center',
	},

	icon: {
		width: 30,
		height: 30,
		resizeMode:'contain',
	},

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