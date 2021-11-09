import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,

		backgroundColor: 'green',

		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: 'red',
	},
});