import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},

	text: {
		fontFamily: theme.fonts.title400,  
		color: theme.colors.white,
		fontSize: 24,
	},

	bar:{
		width: 80,
        height: 6,
        borderRadius: 4,
        
	},

});