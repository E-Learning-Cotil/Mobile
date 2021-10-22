import React from 'react';

import { View, TouchableOpacity, Image, Text } from 'react-native';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

interface Props {
	color: string
	imgLink: string;
	text: string;
}

export function ChatNavBar({ color, imgLink, text }: Props) {
	const navigation = useNavigation();

	function goBackClickHandler() {
		navigation.goBack();
	}

	return (
		<View style={[styles.container, { backgroundColor: color }]}>
			<TouchableOpacity style={styles.button} onPress={goBackClickHandler}>
				<FontAwesome5 name="arrow-left" size={24} color="white" />
			</TouchableOpacity>

			<Image
				style={styles.image}
				source={{ uri: imgLink }}
			/>

			<Text style={styles.text} >
				{ text }
			</Text>
		</View>
	);
}