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
		paddingTop: 30,
	},

	atividades: {
		paddingBottom: 20,
    },

	atividadesList: {
		paddingTop: 5,

		flexDirection: 'row',
		flexWrap: 'wrap',

		justifyContent: 'space-between',
	},

	turmas: {
    },

	turmasList: {

	},
});