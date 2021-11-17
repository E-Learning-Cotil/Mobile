import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: theme.colors.gray80,

		borderRadius: 5,

		padding: 10,
		marginBottom: 15,
	},

	title: {
		fontFamily: theme.fonts.text700,  
		color: theme.colors.white,
		fontSize: 18,
	},

	image: {
		marginTop: 5,
		marginBottom: 5,
	},

	alternative: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlignVertical: 'center',
	},

	alternativeText: {
		fontFamily: theme.fonts.text400,  
		color: theme.colors.white,
		fontSize: 16,
		lineHeight: 18,
	},
});