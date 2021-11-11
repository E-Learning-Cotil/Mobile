import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height - 130,
		padding: 20,

		// backgroundColor: 'green',

		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

		transform: [{ scaleY: -1 }],
	},

	image: {
		width: '100%',
		height: 300,

		// backgroundColor: 'red'
	},

	text: {
		fontFamily: theme.fonts.text700,
		fontSize: 32,
		color: theme.colors.white,
	},
});