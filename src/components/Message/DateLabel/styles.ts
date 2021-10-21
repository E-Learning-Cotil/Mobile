import { StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

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
});