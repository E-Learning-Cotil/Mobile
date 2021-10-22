import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 100,
		position: 'absolute',
		top:0,
		flexDirection:'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop: 30,	
		paddingLeft: 24,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},

	button: {
		marginRight: 15,
	},

	image: {
		width: 50,
		height: 50,

		borderRadius: 25,

		marginRight: 5,
	},

	text: {
		fontFamily: theme.fonts.title400,  
		color: theme.colors.white,
		fontSize: 26,
	},
});