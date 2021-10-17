import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.gray90,

		borderRadius: 8,

		marginBottom: 10,
	},

	button: {
		padding: 10,
		flexDirection: 'row',
	},

	avatarView: {
		marginRight: 10,
	},

	avatar: {
		width: 50,
		height: 50,

		borderRadius: 25,
	},

	textView: {
		justifyContent: 'space-between',

		width: '80%',
	},

	nameView: {
		flexDirection: 'row',

		justifyContent: 'space-between',
		alignItems: 'center',
	},

	name: {
		fontFamily: theme.fonts.text700,
		fontSize: 22,
		color: theme.colors.white,

		lineHeight: 26,
	},

	date: {
		fontFamily: theme.fonts.text400,
		fontSize: 16,
		color: theme.colors.highlight,

		lineHeight: 18,
	},

	message: {
		fontFamily: theme.fonts.text400,
		fontSize: 16,
		color: theme.colors.highlight,

		lineHeight: 16,
	},

	skeleton: {
		backgroundColor: theme.colors.gray90,

		borderRadius: 8,

		marginBottom: 10,
	},
});