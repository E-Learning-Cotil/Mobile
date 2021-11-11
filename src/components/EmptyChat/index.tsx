import React from 'react';

import { View, Text, Image } from 'react-native';

import BeginChatGreen from '../../assets/beginChatGreen.svg';
import BeginChatPurple from '../../assets/beginChatPurple.svg';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	userRole?: 'ALUNO' | 'PROFESSOR';
}

export function EmptyChat({ userRole }: Props) {
	return (
		<View style={styles.container}>
			{
				userRole === 'ALUNO'
				?
				<BeginChatGreen height={'60%'}/>
				:
				<BeginChatPurple height={'60%'}/>
			}

			<Text style={styles.text}>Começar a conversar</Text>
		</View>
	);
}