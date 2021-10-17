import React, { useEffect, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { ContatoChat } from '../../components/ContatoChat';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";

interface Conversation {
	data: string;
	mensagem: string;
	professor: {
		email: string;
		foto: string;
		nome: string;
		rg: string;
		telefone: string;
	}
}

export function Conversas({ navigation }: any){
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const [ conversations, setConversations ] = useState<Conversation[]>([]);

	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		socket.on("conversations", conversations => {
			setConversations(conversations);
			setLoading(false);
		});
		socket.emit("identify", { token });
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Conversas" iconName="comment-alt"
				color={color}
			/>

			<ScrollView style={styles.content}>
				{
					!loading
					?
					conversations.map(conversation => {
						const rg = conversation.professor.rg;
						const avatar = conversation.professor.foto;
						const name = conversation.professor.nome;
						const message = conversation.mensagem;
						const date = conversation.data;

						return <ContatoChat key={rg} loading={false} id={rg} avatar={avatar} name={name} message={message} date={date} navigation={navigation}/>
					})
					:
					[...Array(6)].map((value, index) => {
						return <ContatoChat key={index} loading={true} />
					})
				}
			</ScrollView>
		</View>
	);
}