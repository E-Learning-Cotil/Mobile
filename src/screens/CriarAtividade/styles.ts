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

	buttonAnnex: {
		width: '100%',
		height: 46,
		backgroundColor: theme.colors.white,
		borderRadius: 16,
		marginTop: 16,
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

	buttonAddFile: {
		width: '100%',
		height: 46,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginTop: 16,
	},

	createActivityTextInput: {
		paddingHorizontal: 10,

		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,
		textAlignVertical: 'top',

		backgroundColor: theme.colors.black,
		borderRadius: 5,

		marginBottom: 10,
	},

	createActivityButton: {
		flex: 1,

		height: 45,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		borderRadius: 4,
	},

	confirmEditButton: {
		flex: 1,

		height: 45,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		borderRadius: 4,
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


	skeleton: {
		paddingHorizontal: 20,
		borderRadius: 16,

		marginVertical: 8,
	},
});