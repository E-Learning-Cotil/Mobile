import React, { Dispatch, SetStateAction } from 'react';

import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	userRole?: 'ALUNO' | 'PROFESSOR';
	sendMessageClickHandler(): void;
}

export function ChatTextBox({ message, setMessage, userRole, sendMessageClickHandler }: Props) {
	const color = userRole === 'ALUNO' ? theme.colors.green90 : theme.colors.purple80;

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
				<FontAwesome5 name="telegram-plane" size={25} color={color}  />
			</TouchableOpacity>
		</View>
	);
}