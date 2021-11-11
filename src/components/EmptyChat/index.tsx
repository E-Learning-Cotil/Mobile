import React from 'react';

import { View, Text, Image } from 'react-native';

import  BeginChat from '../../assets/beginChat.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function EmptyChat() {
	return (
		<View style={styles.container}>
			<Image
				source={BeginChat}
				style={styles.image}
				resizeMode={'contain'}
			/>

			<Text style={styles.text}>Começar a conversar</Text>
		</View>
	);
}