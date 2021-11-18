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

	topicosList: {
		paddingTop: 5,
		marginBottom: 30,
	},

	buttonView: {
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

	createTopicoButton: {
		flex: 1,

		height: 45,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		borderRadius: 4,
	},

	createTopicoButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 24,
		lineHeight: 26,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	modal: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,

		backgroundColor: `${theme.colors.black}55`,

		justifyContent: 'center',
		alignItems: 'center',
	},

	modalCloseButtonView: {
		position: 'absolute',
		top: '23%',
		right: '10%',
	},

	modalCloseButton: {
		width: 30,
		height: 30,
		borderRadius: 15,

		backgroundColor: `${theme.colors.black}aa`,

		justifyContent: 'center',
		alignItems: 'center',

	},

	modalContent: {
		width: '80%',

		backgroundColor: theme.colors.gray90,
		paddingHorizontal: 15,
		paddingVertical: 20,

		borderRadius: 10,

		flexDirection: 'column',
	},

	modalText: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		marginBottom: 5,
	},

	modalTextInput: {
		paddingHorizontal: 10,

		fontFamily: theme.fonts.text700,
		fontSize: 16,
		color: theme.colors.white,
		textAlignVertical: 'top',

		backgroundColor: theme.colors.black,
		borderRadius: 5,

		marginBottom: 10,
	},

	modalButton: {
		height: 40,

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 4,
	},

	modalButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 20,
		lineHeight: 22,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',
	},
});