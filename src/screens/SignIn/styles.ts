import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background,
    },

	topImage: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: 150,
	},

	bottomImage: {
		position: 'absolute',
		top: (Dimensions.get('screen').height - 150),
		width: '100%',
		height: 150,
	},

	pageTitleView: {
		position: 'absolute',
		top: 60,
		left: 30,

		flexDirection: 'row',
	},

	greenTitle: {
		fontFamily: theme.fonts.title400,
		color: theme.colors.green90,
		fontSize: 56,
	},

	purpleTitle: {
		position: 'relative',
		top: 30,

		fontFamily: theme.fonts.title400,
		color: theme.colors.purple90,
		fontSize: 40,
	},

	form: {
		position: 'absolute',
		top: 200,
		bottom: 200,
		width: '80%'
	},

	rolesView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},

	roleView: {
		width: '45%',
		height: 68,
		backgroundColor: theme.colors.gray80,
		borderRadius: 8,

		borderStyle: 'solid',
		borderColor: theme.colors.gray80,
		borderBottomColor: theme.colors.gray90,
		borderLeftWidth: 0.5,
		borderTopWidth: 2,
		borderRightWidth: 0.5,
		borderBottomWidth: 5,

		justifyContent: 'center',
		alignItems: 'center',

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},

	roleViewAluno: {
		height: 65,
		backgroundColor: theme.colors.green90,

		borderColor: theme.colors.green90,
		borderBottomColor: theme.colors.green100,
		borderLeftWidth: 0.5,
		borderTopWidth: 0,
		borderRightWidth: 0.5,
		borderBottomWidth: 3,
	},

	roleViewProfessor: {
		height: 65,
		backgroundColor: theme.colors.purple90,

		borderColor: theme.colors.purple90,
		borderBottomColor: theme.colors.purple100,
		borderLeftWidth: 0.5,
		borderTopWidth: 0,
		borderRightWidth: 0.5,
		borderBottomWidth: 3,
	},

	roleButton: {
		position: 'absolute',
		top: -2,
		right: 0,
		bottom: 0,
		left: 0,

		justifyContent: 'center',
		alignItems: 'center',
	},

	roleButtonText: {
		fontFamily: theme.fonts.text400,
		color: '#FFF',
		fontSize: 16,
	},

	inputsView: {
		marginTop: 15,
		justifyContent: 'space-between',
		height: 135,	
	},

	inputView: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: 60,
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 8,
	},

	input: {
		paddingLeft: 10,
		paddingVertical: 10,
		width: '95%',
	},

	validationMessage: {
		color: theme.colors.red70,
		position: 'absolute',
		right: 5,
	},

	checkboxView: {
		flexDirection: 'row',
		marginTop: 15
	},

	checkboxText: {
		fontFamily: theme.fonts.text400,
		color: '#FFF',
		marginLeft: 5
	},

	submitMessage: {
		color: theme.colors.red70,
		marginTop: 5,
	},

	accessButtonView: {
		height: 60,
		marginTop: 5,

		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 8,
	},

	accessButton: {
		width: '100%',
		height: '100%',

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	accessButtonText: {
		fontFamily: theme.fonts.text700,
		color: '#fff',
		fontSize: 20,
	},
});