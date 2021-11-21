import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},

	userInfoView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		paddingHorizontal: 20,
		width: '100%',
		height: 100,
	},

	userInfoTextView: {
		marginLeft: 10,
		paddingRight: 40,
	},

	userName: {
		color: theme.colors.white,
		fontFamily: theme.fonts.text400,
		fontSize: 18,
	},

	userEmail: {
		color: theme.colors.white,
		fontFamily: theme.fonts.text400
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
		paddingRight: 10,
	},
});