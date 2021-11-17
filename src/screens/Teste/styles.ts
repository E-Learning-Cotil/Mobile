import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: theme.colors.background,
	},

	content: {
		padding: 20,
	},

	perguntasList: {
		paddingBottom: 30,
	},

	buttonsView: {
		flexDirection: 'row',
	},

	submitButton: {
		flex: 1,

		height: 42,
		backgroundColor: theme.colors.purple90,

		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 4,
	},

	submitButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
	},
});