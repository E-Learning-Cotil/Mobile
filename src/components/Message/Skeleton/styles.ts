import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		padding: 20,

		transform: [{ scaleY: -1 }],
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
});