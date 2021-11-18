import { Dimensions, StyleSheet } from 'react-native';
import { abs } from 'react-native-reanimated';

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
		minHeight: '100%',
	},

	scrollViewContent: {
		marginBottom: '70%',
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

	createPostButton: {
		flex: 1,

		height: 45,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		borderRadius: 4,
	},

	createPostButtonText: {
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

	modalContent: {
		width: '80%',

		backgroundColor: theme.colors.gray90,
		paddingHorizontal: 15,
		paddingTop: 20,
		paddingBottom: 10,

		borderRadius: 10,

		flexDirection: 'column',
	},

	modalCloseButtonView: {
		position: 'absolute',
		top: '31%',
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

	modalButton: {
		height: 40,

		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',

		paddingHorizontal: 20,
		marginBottom: 10,

		borderRadius: 4,
	},

	modalButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 20,
		lineHeight: 22,
		color: theme.colors.white,

		marginLeft: 10,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	skeleton: {
		marginHorizontal: 20,
		borderRadius: 16,

		marginTop: 8,
	},
});