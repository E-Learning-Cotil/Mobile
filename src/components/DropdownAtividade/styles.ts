import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.gray90,
		borderRadius: 16,

		justifyContent: 'center',
		alignItems: 'center',

		paddingVertical: 7,
		paddingHorizontal: 12,

		marginBottom: 5,
	},

	header: {
		zIndex: 2,
		flexDirection: 'row',
		alignItems: 'center',

		width: '100%',
	},

	title: {
		fontFamily: theme.fonts.title400,
		fontSize: 24,
		color: theme.colors.white,

		maxWidth: '50%',

		marginRight: 10,
	},

	deadline: {
		fontFamily: theme.fonts.title400,
		fontSize: 16,
		color: theme.colors.white,
	},

	caret: {
		position: 'absolute',
		right: 0,
	},

	body: {
		zIndex: 1,
		width: '100%',

		marginBottom: 3,

		justifyContent: 'flex-end',
		overflow: 'hidden',
	},

	description: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		maxWidth: '80%',

		marginBottom: 15,
	},

	buttonsView: {
		flexDirection: 'row',
	},

	navigateButton: {
		flex: 1,

		height: 36,
		backgroundColor: theme.colors.purple90,

		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 4,
	},

	navigateButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
	},

	skeleton: {
		backgroundColor: theme.colors.gray90,

		borderRadius: 16,

		marginBottom: 5,
	},
});