import React from 'react';

import { View, ViewProps, Text } from 'react-native';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';

type Props = ViewProps & {
  title: string;
  color: string;
}

export function LabelText({title, color,...rest}: Props) {
    return(
		<View style={[styles.container, rest]}>
				<Text style={styles.text}>{title}</Text>
        <View style={[styles.bar, { backgroundColor: color  } ]} />
		</View>

    );
  }