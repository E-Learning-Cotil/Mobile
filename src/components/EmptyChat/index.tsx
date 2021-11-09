import React from 'react';

import { View, Text } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function EmptyChat() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>AAAAAAAAAAAAAA</Text>
		</View>
	);
}