import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	dateLabel: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		marginTop: 15,
	},

	dateLabelText: {
		fontFamily: theme.fonts.text700,
		fontSize: 14,
		color: theme.colors.white,
		lineHeight: 16,

		backgroundColor: theme.colors.gray70,
		paddingHorizontal: 6,
		paddingVertical: 3,
		borderRadius: 8,
		opacity: 0.75,
	},

	container: {
		maxWidth: '85%',
		alignSelf: 'flex-start',
		backgroundColor: theme.colors.gray90,

		borderRadius: 8,

		marginTop: 10,
		marginLeft: 20,
		paddingVertical: 3,
		paddingHorizontal: 8,

		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
	},

	rightMessage: {
		marginLeft: 0,
		marginRight: 20,

		alignSelf: 'flex-end',
		backgroundColor: theme.colors.green90,
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