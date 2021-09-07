import React from 'react';

import { View, ViewProps, Text } from 'react-native';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 

type Props = ViewProps & {
  title: string;
  iconName: string;
}

export function LabelIcon({title, iconName,...rest}: Props) {
    return(
		<View style={[styles.container, rest]}>
				<FontAwesome5 name={iconName} size={24} color="white" />
				<Text style={styles.text}>{title}</Text>
		</View>

    );
  }