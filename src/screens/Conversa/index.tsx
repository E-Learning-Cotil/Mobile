import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text } from 'react-native';

import { NavBar } from '../../components/NavBar';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Socket } from "socket.io-client";

interface Props {
	id: string;
	socket: Socket;
}

export function Conversa({ id, socket }: Props) {
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	useEffect(() => {

	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Conversas" iconName="comment-alt"
				color={color}
			/>

			<ScrollView style={styles.content}>
				<Text>AAAAAAAAAAAAAAAAA</Text>
			</ScrollView>
		</View>
	);
}