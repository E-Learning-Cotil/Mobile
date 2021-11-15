import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: theme.colors.background,
	},

	bottomContainer: {
		// justifyContent: 'flex-end',
		height: 170,
		backgroundColor: theme.colors.gray80,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 10,
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

	subtitle: {
		fontFamily: theme.fonts.title400,
		fontSize: 16,
	},

	buttonAnnex: {
		width: '100%',
		height: 46,
		backgroundColor: theme.colors.white,
		borderRadius: 16,
		marginTop: 16,
	},

	buttonAddFile: {
		width: '100%',
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginTop: 16,
		backgroundColor: theme.colors.background,
	},

	buttonSend: {
		width: '100%',
		height: 46,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		marginTop: 16,
		paddingHorizontal: 20,
	},

	row: {
		flexDirection: 'row',
	},

	contentDiv: {
		alignItems: 'center',
		width: '70%',
		marginLeft: '5%',
		flexDirection: 'row',
		
	},

	iconDiv: {
		borderRadius: 16,
		width: '25%',
		backgroundColor: theme.colors.gray70,
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
	},

	description: {
		fontFamily:theme.fonts.text400,
		fontSize: 18,
		marginTop: 10,
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
		paddingHorizontal: 20,
		borderRadius: 16,

		marginVertical: 8,
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 250,
	},

	modalDiv: {
		width: '90%',
		height: 200,
		backgroundColor: theme.colors.gray80,
		paddingHorizontal: 20,
	}
});