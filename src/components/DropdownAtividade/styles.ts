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
	},

	header: {
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
		backgroundColor: 'pink',
		flex: 1,
	},
});