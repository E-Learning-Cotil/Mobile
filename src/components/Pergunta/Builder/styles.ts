import { Dimensions, StyleSheet } from 'react-native';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: theme.colors.gray80,

		borderRadius: 5,

		padding: 10,
		marginBottom: 15,
	},

	title: {
		maxHeight: 90,

		fontFamily: theme.fonts.text700,  
		color: theme.colors.white,
		fontSize: 18,
		lineHeight: 20,

		borderBottomColor: theme.colors.white,
		borderBottomWidth: 2,
		borderStyle: 'solid',

		textAlignVertical: 'top',

		marginBottom: 10,
	},

	changeImageButton: {
		marginTop: 5,
		marginBottom: 10,
	},

	image: {
		borderRadius: 10,
	},

	avatarPickerView: {
		position: 'absolute',
		width: '100%',
		height: '100%',

		borderColor: theme.colors.white,
		borderWidth: 2,
		borderRadius: 10,

		backgroundColor: '#00000066',

		justifyContent: 'center',
		alignItems: 'center',
	},

	avatarPickerText: {
		fontFamily: theme.fonts.text400,
		fontSize: 24,
		color: theme.colors.white,

		textAlign: 'center',
		textAlignVertical: 'center',
	},

	alternative: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlignVertical: 'center',
	},

	alternativeText: {
		fontFamily: theme.fonts.text400,  
		color: theme.colors.white,
		fontSize: 18,
		lineHeight: 20,

		width: Dimensions.get('window').width - 100,
	},

	addOptionButton: {
		width: '100%',

		height: 32,

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 5,

		marginTop: 5,
	},

	addOptionButtonText: {
		fontFamily: theme.fonts.text700,
		fontSize: 18,
		color: theme.colors.white,
	},
});