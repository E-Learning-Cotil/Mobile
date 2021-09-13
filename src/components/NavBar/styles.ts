import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container:{
		width: '100%',
		height: 100,
		position: 'absolute',
		top:0,
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 30,	
		paddingLeft:24
	},

	navButton: {
		width: 70,
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	},
});