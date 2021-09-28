import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
		
	},

	text: {
		fontFamily: theme.fonts.title400,  
		color: theme.colors.white,
		fontSize: 24,
		paddingLeft: 10,
	},

	icon: {
		width: 30,
		height: 30,
		resizeMode:'contain',
	},

});