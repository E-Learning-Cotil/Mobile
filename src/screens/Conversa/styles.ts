import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
		paddingBottom: 50,
		backgroundColor: theme.colors.background,
	},

	content: {
	},

	messages: {
		padding: 20,
	},

	scrollDownButton: {
		backgroundColor: theme.colors.gray70,
		position: 'absolute',
		right: 10,
		bottom: 55,

		height: 32,
		width: 32,
		borderRadius: 16,

		justifyContent: 'center',
		alignItems: 'center',
	},
});