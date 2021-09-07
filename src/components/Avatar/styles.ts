import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white
    //marginRight: 22
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
	alignItems: 'center',
    justifyContent: 'center',
  }
});