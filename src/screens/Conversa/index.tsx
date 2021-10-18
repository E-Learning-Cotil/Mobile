import React, { useEffect, useState, useRef } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { Message } from '../../components/Message'

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";

interface Props {
	route: {
		params: {
			id: string;
			name: string;
		};
	};
}

interface Message {
	data: string;
	mensagem: string;
	origem: {
		role: 'ALUNO' | 'PROFESSOR';
		nome: string;
		identity: string;
	}
}

export function Conversa({route: {params: { id, name } }}: Props) {
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const scrollViewRef = useRef<ScrollView | null>(null);

	const [ messages, setMessages ] = useState<Message[]>([]);

	const [ loading, setLoading ] = useState<boolean>();

	useEffect(() => {
		if (!loading) setLoading(true);
		if (messages.length !== 0) setMessages([]);

		socket.on("previous_messages", setMessages);
		socket.emit("identify", { token });
		socket.emit("open_chat", { otherUser: id, token });
		socket.on("new_message", ([data]: Message[]) => {
			setMessages((prevMessages: Message[]) => {
                if((data.origem.identity === id)){
                    return [...prevMessages, data]
                }
				else {
					return prevMessages;
				}
            });
        });
	}, [id]);

	useEffect(() => {
		if (messages.length !== 0) setLoading(false);
	}, [messages]);

	return(
		<View style={styles.container}>          
			<NavBar 
				title={name} iconName="arrow-left"
				color={color}
			/>

			<ScrollView style={styles.content} ref={scrollViewRef} onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd({ animated: true });}}>
				<View style={styles.messages}>
					{
						!loading
						?
						messages.map((message, index) => {
							const mensagem = message.mensagem;
							const data = message.data;
							const right = message.origem.role === role ? true : false;

							return <Message key={index} loading={false} message={mensagem} date={data} right={right} />
						})
						:
						[...Array(6)].map((value, index) => {
							return <Message key={index} loading={true} right={index%2 ? true : false} />
						})
					}
				</View>
			</ScrollView>
		</View>
	);
}