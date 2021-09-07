import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},

	userInfoView: {
		paddingTop: 40,
		paddingBottom: 10,
		paddingHorizontal: 20,
		width: '100%',

		backgroundColor: theme.colors.green90
	},

	pageLinksView: {},

	signOutView: {
		marginTop: 'auto',
		marginBottom: 10,
		width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
	},

	signOutButton: {
		flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'center',
	},

	text: {
		fontFamily: theme.fonts.title400,  
		color: theme.colors.white,
		fontSize: 24,
		paddingLeft: 10,
	},
});