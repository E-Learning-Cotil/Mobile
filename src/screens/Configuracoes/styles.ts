import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: 100,
		backgroundColor: theme.colors.background,
    //alignItems: 'center',
	},

  avatarDiv: {
    height: 120,
    width: '100%',
  },

  avatarBackground: {
     height:100,
     width: '100%',
     borderRadius: 10,
    },

  content: {
		padding: 20,
		paddingTop: 20,
	},

  userInfo: {
    marginTop: 10,
  },

  textConfig: {
    paddingLeft: 5,
    marginTop: 2,
    color: theme.colors.white,
    fontFamily: theme.fonts.text400,
    fontSize: 20,
    marginBottom: 20,
  },

  configButton: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    backgroundColor: theme.colors.gray90,
    borderRadius: 10,
    marginTop: 15,
  },

  textEdit: {
    backgroundColor: theme.colors.gray70,
    borderRadius: 10
  }

});