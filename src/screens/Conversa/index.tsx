import React, { useEffect, useState, useRef } from 'react';

import { View, FlatList } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons'; 

import { ChatNavBar } from '../../components/ChatNavBar';
import { Message } from '../../components/Message';
import { Skeleton } from '../../components/Message/Skeleton';
import { ChatTextBox } from '../../components/ChatTextBox';

import { useAuth } from '../../contexts/auth';
import { getNowDateUtc } from '../../utils/moment';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";

interface Props {
	route: {
		params: {
			id: string;
			name: string;
			imgLink: string;
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

interface FlatListProps {
	item: Message;
	index: number;
}

export function Conversa({route: {params: { id, name, imgLink } }}: Props) {
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const flatListRef = useRef<FlatList | null>(null);

	const [ scrolledToBottom, setScrolledToBottom ] = useState(true);

	const [ messages, setMessages ] = useState<Message[]>([]);
	const [ newMessage, setNewMessage ] = useState('');

	const [ loading, setLoading ] = useState<boolean>(true);

	useEffect(() => {
		if (!loading) setLoading(true);
		if (messages.length !== 0) setMessages([]);

		socket.on("previous_messages", (messages: Message[]) => setMessages(messages.reverse()));
		socket.emit("identify", { token });
		socket.emit("open_chat", { otherUser: id, token });
		socket.on("new_message", ([data]: Message[]) => {
			setMessages((prevMessages: Message[]) => {
                if(data.origem.identity === id){
                    return [data, ...prevMessages];
                }
				else {
					return prevMessages;
				}
            });
        });
	}, [id]);

	useEffect(() => {
		if (messages.length !== 0) {
			setLoading(false);
			flatListRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
		}
	}, [messages]);

	const messageComponent = ({ item: message, index }: FlatListProps) => {
		const firstMessage = index === messages.length - 1;
		const lastMessage = index === 0;

		const mensagem = message.mensagem;
		const data = message.data;
		const right = message.origem.role === role;
		const lastMessageSameSide = !firstMessage ? message.origem.role === messages[index+1].origem.role : false;
		const lastMessageDate = !firstMessage ? messages[index+1].data : message.data;

		return <Message 
			key={index} message={mensagem} date={data} right={right} 
			lastMessageSameSide={lastMessageSameSide} lastMessageDate={lastMessageDate}
			lastMessage={lastMessage} firstMessage={firstMessage}
		/>;
	}

	const sendMessageClickHandler = () => {
		if (newMessage && user) {
			socket.emit("new_message", { message: newMessage, otherUser: id, token });

			setMessages((prevMessages: Message[]) => {
				const newMessageObject: Message = {
					data: getNowDateUtc(),
					mensagem: newMessage,
					origem: {
						identity: user.id.toString(),
						nome: user.nome,
						role: user.role,
					}
				};
				return [newMessageObject, ...prevMessages];
                
            });

			setNewMessage('');
		}
	}

	return(
		<View style={styles.container}>          
			<ChatNavBar 
				text={name}
				color={color}
				imgLink={imgLink}
			/>
			
			<FlatList
				data={messages}
				renderItem={messageComponent}
				keyExtractor={(item, index) => {return index.toString()}}
				inverted
				initialNumToRender={20}
				ListEmptyComponent={<Skeleton />}

				scrollEnabled={!loading}

				ref={flatListRef}
				onScroll={(e) => {
					e.nativeEvent.contentOffset.y < 10 ? setScrolledToBottom(true) : setScrolledToBottom(false);
				}}
			/>
			{
				(!scrolledToBottom && !loading) &&
				<RectButton
					onPress={() => {
						flatListRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
					}}
					style={styles.scrollDownButton}
				>
					<FontAwesome5 name="angle-down" size={24} color="white" />
				</RectButton>
			}

			<ChatTextBox message={newMessage} setMessage={setNewMessage} sendMessageClickHandler={sendMessageClickHandler} />
		</View>
	);
}