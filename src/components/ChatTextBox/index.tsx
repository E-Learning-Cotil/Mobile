import React, { Dispatch, SetStateAction, useState } from 'react';

import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	sendMessageClickHandler(): void;
}

export function ChatTextBox({ message, setMessage, sendMessageClickHandler }: Props) {
	return (
		<View style={[styles.container]}>
			<TextInput
				style={[styles.input]}
				onChangeText={setMessage}
				value={message}

				placeholder={'Digite uma mensagem'}
				placeholderTextColor={theme.colors.highlight}
			/>

			<TouchableOpacity style={styles.button} onPress={sendMessageClickHandler}>
				<FontAwesome5 name="telegram-plane" size={25} color={theme.colors.green90}  />
			</TouchableOpacity>
		</View>
	);
}