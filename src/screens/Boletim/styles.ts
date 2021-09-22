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

	boletim: {
		// borderColor: '#fff',
		// borderWidth: 2,
		// borderBottomWidth: 0,
	},

	tableGroup: {
		// borderColor: theme.colors.white,
		// borderBottomWidth: 2,
	},

	tableHeader: {
		backgroundColor: theme.colors.gray90,

		zIndex: 2,
		paddingBottom: 5,
		paddingHorizontal: 10,

		flexDirection: 'row',

		justifyContent: 'space-between',
		alignItems: 'center',
	},

	headerText: {
		color: theme.colors.white,
		fontFamily: theme.fonts.text700,
		fontSize: 24,
	},

	tableBody: {
		zIndex: 1,

		justifyContent: 'space-around',
	},

	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	tableColumnTitle: {
		marginLeft: 20,

		width: '60%',
	},

	tableColumn: {
		marginRight: 20,

		width: '20%',

		justifyContent: 'center',
		alignItems: 'center',
	},

	tableText: {
		color: theme.colors.white,
		fontFamily: theme.fonts.text400,
		fontSize: 20,
		lineHeight: 22,
	},
});