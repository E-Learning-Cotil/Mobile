import React, { useEffect, useState, useRef } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { View, FlatList } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons'; 

import { ChatNavBar } from '../../components/ChatNavBar';
import { Message } from '../../components/Message';
import { Skeleton } from '../../components/Message/Skeleton';
import { EmptyChat } from '../../components/EmptyChat';
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
	navigation: DrawerNavigationProp<{}>
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

export function Conversa({route: {params: { id, name, imgLink } }, navigation}: Props) {
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io(process.env.API_URL as any);

	const flatListRef = useRef<FlatList | null>(null);
	const otherUserIdRef = useRef(id);

	const [ scrolledToBottom, setScrolledToBottom ] = useState(true);

	const [ messages, setMessages ] = useState<Message[]>([]);
	const [ newMessage, setNewMessage ] = useState('');

	const [ loading, setLoading ] = useState<boolean>(true);

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
			lastMessage={lastMessage} firstMessage={firstMessage} userRole={role}
		/>;
	}

	function sendMessageClickHandler () {
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

	function loadPreviousMessagesHandler (messages: Message[]) {
		setMessages(messages.reverse());			
		setLoading(false);
		
		if (messages.length !== 0) {
			flatListRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
		}
	}

	useEffect(() => {
		otherUserIdRef.current = id;

		if (!loading) setLoading(true);
		if (messages.length !== 0) setMessages([]);
		if (newMessage.length !== 0) setNewMessage('');

		socket.on("previous_messages", loadPreviousMessagesHandler);
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
		navigation.addListener('focus', () => {
			socket.emit("identify", { token });
			socket.emit("open_chat", { otherUser: otherUserIdRef.current, token });
		});
	}, []);


	return(
		<View style={styles.container}>          
			<ChatNavBar 
				text={name}
				color={color}
				imgLink={imgLink}
				lastMessage={{ ...messages[0], destino: id }}
			/>
			
			<FlatList
				data={messages}
				renderItem={messageComponent}
				keyExtractor={ item => item.data + item.origem.role + item.mensagem.length }
				inverted
				initialNumToRender={20}
				ListEmptyComponent={loading ? <Skeleton userRole={role} /> : <EmptyChat userRole={role} />}

				scrollEnabled={!loading && messages.length !== 0}

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

			<ChatTextBox message={newMessage} setMessage={setNewMessage} userRole={role} sendMessageClickHandler={sendMessageClickHandler} />
		</View>
	);
}