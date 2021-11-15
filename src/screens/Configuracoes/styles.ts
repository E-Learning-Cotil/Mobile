import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: theme.colors.background,
	},

	avatarView: {
		height: 120,
		width: '100%',
	},

	avatarBackground: {
		height: 100,
		width: '100%',
		borderRadius: 10,
	},

	avatar: {
		width: 100,
		height: 100,
		marginTop: 20,
		marginLeft: 20,
		position: "absolute",
	},

	avatarPicker: {
		width: 100,
		height: 100,
		marginTop: 20,
		marginLeft: 20,
		position: "absolute",
	},

	avatarPickerView: {
		width: '100%',
		height: '100%',

		borderColor: theme.colors.white,
		borderWidth: 2,
		borderRadius: 10,

		backgroundColor: '#00000066',

		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},

	avatarPickerText: {
		fontFamily: theme.fonts.text400,
		fontSize: 24,
		color: theme.colors.white,
	},

	content: {
		padding: 20,
		paddingTop: 20,
	},

	userInfo: {
		marginTop: 10,
	},

	textConfig: {
		left: -10,
		padding: 0,
		paddingLeft: 12,
		marginTop: 2,
		color: theme.colors.white,
		fontFamily: theme.fonts.text400,
		fontSize: 20,
		marginBottom: 20,
	},

	textEdit: {
		padding: 0,
		borderBottomColor: theme.colors.white,
		borderBottomWidth: 0.8,
		borderRadius: 10,
	},

	buttonView: {
		position: 'absolute',
		right: 12,
		bottom: 20,
		left: 12,
	},

	configButton: {
		width: '100%',
		height: 60,
		paddingRight: 10,

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: theme.colors.gray90,
		borderRadius: 10,
	},
});