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

	header: {
		width: '100%',

		flexDirection: 'column',
		alignItems: 'center',

		marginBottom: 10,
	},

	headerTitle: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		textAlign: 'center',
	},

	headerSubtitle: {
		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,

		textAlign: 'center',
	},

	buttonsView: {
		flexDirection: 'row',
		justifyContent: 'center',
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

	alreadyAnsweredView: {
		width: '100%',
		backgroundColor: theme.colors.gray90,

		borderRadius: 5,

		padding: 10,
	},

	alreadyAnsweredTitleView: {
		flexDirection: 'row',

		justifyContent: 'center',
		alignItems: 'center',
	},

	alreadyAnsweredTitle: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
		lineHeight: 22,

		textAlign: 'center',
		textAlignVertical: 'center',

		marginLeft: 5,
	},

	alreadyAnsweredGrade: {
		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	goBackButton: {
		height: 40,
		maxWidth: '100%',
		backgroundColor: theme.colors.purple90,

		justifyContent: 'center',
		alignItems: 'center',

		marginTop: 10,
		paddingHorizontal: 20,

		borderRadius: 4,
	},

	goBackButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,
		lineHeight: 18,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	skeleton: {
		borderRadius: 8,
		marginBottom: 10,
	},
});