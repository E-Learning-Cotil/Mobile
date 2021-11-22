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

	headerTextArea: {
		width: '100%',
		minHeight: 98,
		maxHeight: 300,

		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
		textAlignVertical: 'top',

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

	filesView: {
		minHeight: Dimensions.get('window').height - 395,
		paddingBottom: 20, 
	},

	filesViewTitle: {
		fontFamily:theme.fonts.title400,
		fontSize: 22,
		color: theme.colors.white,
	},

	annexedFileView: {
		flexDirection: 'row',
		width: '100%',
		height: 46,
		backgroundColor: theme.colors.white,
		borderRadius: 16,
		marginTop: 16,
	},

	fileNameView: {
		alignItems: 'center',
		width: '70%',
		marginLeft: '5%',
		flexDirection: 'row',
	},

	fileName: {
		paddingLeft: 12,
		paddingRight: 24,
		fontFamily:theme.fonts.title400,
		color: theme.colors.background,
		fontSize: 18,
	},

	removeFileButton: {
		borderRadius: 16,
		width: '25%',
		backgroundColor: theme.colors.gray70,
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
	},

	addFileButton: {
		width: '100%',
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginTop: 16,
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