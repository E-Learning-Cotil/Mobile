import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	box: {
		width: 20,
		height: 20,
		backgroundColor: '#FFF',
		borderRadius: 4,

		justifyContent: 'center',
		alignItems: 'center',
	},

	selected: {
		backgroundColor: theme.colors.green80,
	}
});