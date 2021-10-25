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

	text: {
		color: theme.colors.white,
	},

	title: {
		fontFamily:theme.fonts.title400,
		fontSize: 22,
	},

	description: {
		fontFamily:theme.fonts.text400,
		fontSize: 18,
	},

	topicosList: {
		paddingTop: 5,
	},

	carousel: {
		
	},

	scrollView: {
		marginBottom: 40,
	},

	skeleton: {
		marginHorizontal: 20,
		borderRadius: 16,

		marginVertical: 8,
	},
});