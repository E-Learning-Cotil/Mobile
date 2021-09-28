import React from 'react';

import { View, ViewProps, Text, Image } from 'react-native';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 

type Props = ViewProps & {
  title: string;
  iconName?: string;
}

export function LabelIcon({title, iconName,...rest}: Props) {
    const isLink = iconName?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    return(
		<View style={[styles.container, rest.style]}>
        {
          isLink === null? <FontAwesome5 name={iconName} size={24} color="white" /> :
							<Image
								source={{ uri: iconName }}
								style={ styles.icon }
							/>
          }
				<Text style={styles.text}>{title}</Text>
		</View>

    );
  }