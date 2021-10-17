import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { Message } from '../../components/Message'

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { io } from "socket.io-client";

interface Props {
	id: string;
	name: string;
}

export function Conversa({route: {params: { id, name }}}: Props) {
	// const {id, name}: Props = route.params;

	console.log("Conversa", id, name)
	const { user, token } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const socket = io("https://elearning-tcc.herokuapp.com");

	const [messages, setMessages] = useState([]);

	useEffect(() => {

	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title={name} iconName="arrow-left"
				color={color}
			/>

			<ScrollView style={styles.content}>
				<View style={styles.messages}>
					{
						[...Array(6)].map((value, index) => {
							return <Message key={index} loading={false} message={'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'} date={'2021-10-17T16:24:21.927Z'} right={index%2 ? true : false} />
						})
					}

					{
						[...Array(6)].map((value, index) => {
							return <Message key={index} loading={true} right={index%2 ? true : false} />
						})
					}
				</View>
			</ScrollView>
		</View>
	);
}