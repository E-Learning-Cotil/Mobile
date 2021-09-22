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
    color: theme.colors.white,
    fontFamily: theme.fonts.text400,
    fontSize: 20,
  },



});