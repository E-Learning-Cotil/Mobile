import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		maxWidth: '90%',
		alignSelf: 'flex-start',
		backgroundColor: theme.colors.gray90,

		borderRadius: 8,
		borderTopLeftRadius: 0,

		marginBottom: 10,
		paddingVertical: 3,
		paddingHorizontal: 8,

		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	rightMessage: {
		alignSelf: 'flex-end',
		backgroundColor: theme.colors.green90,

		borderTopLeftRadius: 8,
		borderTopRightRadius: 0,
	},

	messageBubbleCorner: {
		position: 'absolute',
		top: 0,
		left: -10,

		width: 0,
		height: 0,
		borderTopWidth: 10,
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderStyle: 'solid',
		backgroundColor: 'transparent',
		borderTopColor: theme.colors.gray90,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
	},

	rightMessageBubbleCorner: {
		left: undefined,
		right: -10,

		borderTopColor: theme.colors.green90,
	},

	messageView: {
		maxWidth: '85%',

		justifyContent: 'center',
	},

	message: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,

		lineHeight: 20,

		textAlignVertical: 'center',
	},

	dateView: {
		marginLeft: 10,

		justifyContent: 'flex-end',
	},

	date: {
		fontFamily: theme.fonts.text400,
		fontSize: 16,
		color: theme.colors.white,

		lineHeight: 18,
	},

	skeleton: {
		backgroundColor: theme.colors.gray90,

		borderRadius: 8,

		marginBottom: 10,
	},

	rightSkeleton: {
		backgroundColor: theme.colors.green90,

		borderRadius: 8,

		marginBottom: 10,
	},
});