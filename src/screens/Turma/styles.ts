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

	turmas: {
		paddingBottom: 30,
    },

	turmasList: {
		paddingTop: 5,
	},
});