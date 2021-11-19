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

	row: {
		flexDirection: 'row',
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
	
	description: {
		fontFamily:theme.fonts.text400,
		fontSize: 18,
		marginTop: 10,
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

	
	buttonView: {
		position: 'absolute',
		bottom: 0,
		zIndex: 10,

		flexDirection: 'row',
		justifyContent: 'center',

		paddingHorizontal: 15,
		paddingVertical: 15,
		backgroundColor: theme.colors.gray90,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
	},

	editButton: {
		flex: 1,

		height: 45,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		borderRadius: 4,
	},

	editButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 24,
		lineHeight: 26,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	cancelConfirmButton: {
		width: '45%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
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

	modal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 70,
	},

	modalDiv: {
		width: '90%',
		height: 170,
		backgroundColor: theme.colors.gray80,
		paddingHorizontal: 20,
	},

	skeleton: {
		paddingHorizontal: 20,
		borderRadius: 16,

		marginVertical: 8,
	},

});