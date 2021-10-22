import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 50,
		position: 'absolute',
		bottom: 0,

		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 20,

		backgroundColor: theme.colors.gray90,
	},

	input: {
		backgroundColor: theme.colors.gray70,
		opacity: 0.75,
		
		height: 35,
		width: Dimensions.get('window').width - 75,
		
		paddingHorizontal: 10,
		
		borderRadius: 20, 

		color: theme.colors.white,
		fontFamily: theme.fonts.text700
	},

	button: {},
});