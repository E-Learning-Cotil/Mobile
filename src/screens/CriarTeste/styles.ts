import { Dimensions, StyleSheet } from 'react-native';

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

	header: {
		width: '100%',

		flexDirection: 'column',

		marginBottom: 25,
	},

	headerInput: {
		width: '100%',
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		borderBottomColor: theme.colors.white,
		borderBottomWidth: 2,
		borderStyle: 'solid',

		marginBottom: 10,
	},

	headerDateView: {
		flexDirection: 'row',
	},

	headerText: {
		width: 60,

		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		textAlign: 'left',
	},

	headerDate: {
		width: 170,
		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',

		backgroundColor: theme.colors.gray90,
		borderRadius: 5,
		borderBottomWidth: 2,
		borderStyle: 'solid',
		
		paddingHorizontal: 10,
		marginBottom: 5,
	},

	questionsList: {
		minHeight: Dimensions.get('window').height - 355,
	},

	buttonsView: {
		flexDirection: 'column',
		justifyContent: 'center',

		marginBottom: 20,
	},

	submitButton: {
		width: '100%',

		height: 42,
		backgroundColor: theme.colors.gray90,

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 5,

		marginBottom: 10,
	},

	submitButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
	},

	skeleton: {
		borderRadius: 8,
		marginBottom: 10,
	},
});