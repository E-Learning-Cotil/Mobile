import React, { useEffect, useState, useRef } from 'react';

import { View, ScrollView, FlatList } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons'; 

import { NavBar } from '../../components/NavBar';
import Message from '../../components/Message'
import { Skeleton } from '../../components/Message/Skeleton'

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

interface FlatListProps {
	item: Message;
	index: number;
}

export function Conversa({route: {params: { id, name } }}: Props) {
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const scrollViewRef = useRef<ScrollView | null>(null);
	const flatListRef = useRef<FlatList | null>(null);

	const [ scrolledToBottom, setScrolledToBottom ] = useState(true);

	const [ messages, setMessages ] = useState<Message[]>([]);

	const [ loading, setLoading ] = useState<boolean>(true);

	useEffect(() => {
		if (!loading) setLoading(true);
		if (messages.length !== 0) setMessages([]);

		socket.on("previous_messages", (messages: Message[]) => setMessages(messages.reverse()));
		socket.emit("identify", { token });
		socket.emit("open_chat", { otherUser: id, token });
		socket.on("new_message", ([data]: Message[]) => {
			setMessages((prevMessages: Message[]) => {
                if((data.origem.identity === id)){
                    return [data, ...prevMessages]
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
			flatListRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 1 });
		}
	}, [messages]);

	const messageComponent = ({ item: message, index }: FlatListProps) => {
		const mensagem = message.mensagem;
		const data = message.data;
		const right = message.origem.role === role ? true : false;
		const lastMessageSameSide = index !== messages.length - 1 ? message.origem.role === messages[index+1].origem.role : false;
		const lastMessageDate = index !== messages.length - 1 ? messages[index+1].data : message.data;

		return <Message key={index} message={mensagem} date={data} right={right} lastMessageSameSide={lastMessageSameSide} lastMessageDate={lastMessageDate} />
	}

	return(
		<View style={styles.container}>          
			<NavBar 
				title={name} iconName="arrow-left"
				color={color}
			/>
			
			<FlatList
				data={messages}
				initialNumToRender={20}
				// progressViewOffset={20}
				inverted
				// ItemSeparatorComponent={}
				ListEmptyComponent={<Skeleton />}
				renderItem={messageComponent}
				keyExtractor={(item, index) => {return index.toString()}}
				viewabilityConfig={{
					waitForInteraction: true,
				}}

				ref={flatListRef}
				onScroll={(e) => {
					e.nativeEvent.contentOffset.y < 10 ? setScrolledToBottom(true) : setScrolledToBottom(false);
				}}
			/>
			{
				(!scrolledToBottom && !loading) &&
				<RectButton
					onPress={() => {
						flatListRef.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 1 });
						setScrolledToBottom(true);
					}}
					style={styles.scrollDownButton}
				>
					<FontAwesome5 name="angle-down" size={24} color="white" />
				</RectButton>
			}

			{/* <ScrollView
				style={styles.content}
				ref={scrollViewRef}
				onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd({ animated: true });}}
				onScroll={() => {scrollViewRef.current.contentOff}}
			>
				<View style={styles.messages}>
					{
						!loading
						?
						messages.map((message, index) => {
							const mensagem = message.mensagem;
							const data = message.data;
							const right = message.origem.role === role ? true : false;
							const lastMessageSameSide = index ? message.origem.role === messages[index-1].origem.role : false;
							const lastMessageDate = index ? messages[index-1].data : message.data;

							return <Message key={index} loading={false} message={mensagem} date={data} right={right} lastMessageSameSide={lastMessageSameSide} lastMessageDate={lastMessageDate} />
						})
						:
						[...Array(6)].map((value, index) => {
							return <Message key={index} loading={true} right={index%2 ? true : false} />
						})
					}
				</View>
			</ScrollView> */}
		</View>
	);
}