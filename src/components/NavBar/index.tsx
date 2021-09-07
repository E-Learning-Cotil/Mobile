import React from 'react';

import { View, ViewProps } from 'react-native';
import { LabelIcon } from '../LabelIcon';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 

type Props = {
  title: string;
  iconName: string;
  color: string;

}

export function NavBar({title, iconName, color}: Props){
    return(
      <View style={[styles.container, {backgroundColor: color, paddingLeft:24}]}>
          <LabelIcon title={title} iconName={iconName}/>
          
          <View style={{marginRight: 28}}>
          <FontAwesome5 name="bars" size={32} color="white" />
          </View>

      </View>
    );
  }