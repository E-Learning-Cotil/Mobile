import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 60,
		padding: 2,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.white
	},
	avatar: {
		width: '100%',
		height: '100%',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	}
});