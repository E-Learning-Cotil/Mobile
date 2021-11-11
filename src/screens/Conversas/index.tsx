import React, { useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { ContatoChat } from '../../components/ContatoChat';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";

interface Props {
	route: {
		params?: {
			lastMessage: Message;
		}
	},
	navigation: any;
}

interface Message {
	data: string;
	mensagem: string;
	origem: {
		role: 'ALUNO' | 'PROFESSOR';
		nome: string;
		identity?: string;
	}
	destino: string;
}

interface Conversation {
	data: string | null;
	mensagem: string | null;
	professor: {
		email: string;
		foto: string;
		nome: string;
		rg: string;
		telefone: string;
	}
}

export function Conversas({ route: { params }, navigation }: Props){
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const [ conversations, setConversations ] = useState<Conversation[]>([]);

	const [ loading, setLoading ] = useState(true);

	function updateConversations (message: Message) {
		setConversations(previousState => previousState.map(conversation => {
			if (
				((message.origem.identity === undefined || message.origem.identity === user?.id) && message.destino === conversation.professor.rg) ||
				// (message.origem.identity === user.id && message.destino === conversation.aluno.) || // LOGIN as PROFESSOR
				// (message.origem.role === 'ALUNO' && message.origem.identity === conversation.professor.rg) || // LOGIN as PROFESSOR
				(message.origem.role === 'PROFESSOR' && message.origem.identity === conversation.professor.rg)
			) {
				conversation.data = message.data;
				conversation.mensagem = message.mensagem;
			}
			return conversation;
		}));
	}

	useEffect(() => {
		socket.on("conversations", conversations => {
			setConversations(conversations);
			setLoading(false);
		});
		socket.on("new_message", ([data]: Message[]) => {
			updateConversations(data);
		});

		navigation.addListener('focus', () => {
			socket.emit("identify", { token });
		});
	}, []);

	useEffect(() => {
		if (params?.lastMessage) updateConversations(params.lastMessage);
	}, [params]);

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
						const message = conversation.mensagem || 'Começar a conversar';
						const date = conversation.data;

						return <ContatoChat
									key={rg} loading={false} id={rg} avatar={avatar}
									name={name} message={message} date={date} color={color}
									noMessage={!conversation.mensagem}
								/>
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