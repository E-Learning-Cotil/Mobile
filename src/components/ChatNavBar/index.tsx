import React from 'react';

import { View, TouchableOpacity, Image, Text } from 'react-native';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

interface Props {
	color: string
	imgLink: string;
	text: string;
	lastMessage: {
		data: string;
		mensagem: string;
		origem: {
			role: 'ALUNO' | 'PROFESSOR';
			identity: string;
		};
		destino: string;
	};
}

export function ChatNavBar({ color, imgLink, text, lastMessage }: Props) {
	const navigation = useNavigation();

	function goBackClickHandler() {
		if (lastMessage.origem)
			navigation.navigate('Conversas' as never, { lastMessage } as never);
		else
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

			<Text style={styles.text} numberOfLines={1}>
				{ text }
			</Text>
		</View>
	);
}