import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
 
    container: {
        width: '90%',
        height: 60,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        backgroundColor: theme.colors.gray90,
        borderRadius: 10,
        marginTop: 15,
    },
});