import React from 'react';

import { View, ViewProps, Image } from 'react-native';
import { LabelIcon } from '../LabelIcon';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { RectButton } from 'react-native-gesture-handler';

import { DrawerActions, useNavigation, NavigationProp } from '@react-navigation/native';

type Props = {
	title: string;
	iconName?: string;
	color?: string | undefined;
}

export function NavBar({title, iconName, color}: Props){
	const navigation = useNavigation();
	
	function openDrawerClickHandler () {
		navigation.dispatch(DrawerActions.openDrawer());
	}

    return(
      <View style={[styles.container, { backgroundColor: color }]}>

          <LabelIcon title={title} iconName={iconName}/>
          
          <RectButton style={styles.navButton} onPress={openDrawerClickHandler}>
              <FontAwesome5 name="bars" size={32} color="white" />
          </RectButton>

      </View>
    );
}