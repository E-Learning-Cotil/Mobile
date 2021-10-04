import React, { useEffect, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { ContatoChat } from '../../components/ContatoChat';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";
import api from '../../services/api';

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

export function Conversas(){
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com/");

	const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("conversations", setConversations);
		socket.on("previous_messages", setMessages);
		socket.emit("identify", { token });

		console.log("Conversations: ", conversations);
		console.log("Messages: ", messages);
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Conversas" iconName="comment-alt"
				color={color}
			/>

			<ScrollView style={styles.content}>
				{
					conversations.map(conversation => {
						const rg = conversation.professor.rg;
						const avatar = conversation.professor.foto;
						const title = conversation.professor.nome;
						const message = conversation.mensagem;
						const date = conversation.data;

						return <ContatoChat key={rg} avatar={avatar} title={title} message={message} date={date}/>
					})
				}
			</ScrollView>
		</View>
	);
}