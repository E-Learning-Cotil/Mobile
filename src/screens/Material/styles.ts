import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: theme.colors.background,
	},

	content: {
		padding: 20,
	},

	topicosList: {
		paddingTop: 5,
	},
	skeleton: {
		marginHorizontal: 20,
		borderRadius: 16,

		marginVertical: 8,
	},
});