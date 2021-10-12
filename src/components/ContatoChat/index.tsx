import React, { useEffect, useState } from 'react';

import { View, Image, Text } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { Avatar } from '../Avatar';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	avatar: string;
	title: string;
	message: string;
	date: string;
}

export function ContatoChat({ avatar, title, message, date }: Props){
	const now = new Date((new Date()).getTime() - (3 * 60 * 60 * 1000));
	const messageDate = new Date((new Date(date)).getTime() - (1000 * 3600 * 3));

	const hourDifference = (now.getTime() - messageDate.getTime()) / (1000 * 3600);

	if (hourDifference < 24) {
		const hour = messageDate.getHours() < 10 ? `0${messageDate.getHours()}` : messageDate.getHours();
		const minute = messageDate.getMinutes() < 10 ? `0${messageDate.getMinutes()}` : messageDate.getMinutes();

		date = hour + ':' + minute;
	}
	else {
		const day = messageDate.getDate() < 10 ? `0${messageDate.getDate()}` : messageDate.getDate();
		const month = messageDate.getMonth() < 10 ? `0${messageDate.getMonth()}` : messageDate.getMonth();

		if (now.getFullYear() === messageDate.getFullYear()) {
			date = day + '/' + month;
		} else {
			const year = messageDate.getFullYear();

			date = day + '/' + month + '/' + year;
		}
	}

	return(
		<View style={styles.container}>
			<RectButton
				style={styles.button}
			>
				<View style={styles.avatarView}>
					<Image
						source={{ uri: avatar }}
						style={styles.avatar}
					/>
				</View>
				<View style={styles.textView}>
					<View style={styles.titleView}>
						<Text style={styles.title} numberOfLines={1}>
							{title}
						</Text>
						<Text style={styles.date} numberOfLines={1}>
							{date}
						</Text>
					</View>
					<Text style={styles.message} numberOfLines={1}>
						{message}
					</Text>
				</View>
			</RectButton>
		</View>
	);
}