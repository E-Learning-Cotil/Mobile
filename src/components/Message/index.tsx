import React from 'react';

import { View, Text } from 'react-native';
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	loading: boolean;
	message?: string;
	date?: string;
	right: boolean;
}

export function Message({ loading, message, date, right }: Props) {
	if (date) {
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
	}

	if (!loading)
		return (
			<View style={[
				styles.container,
				right && styles.rightMessage
			]}>
				<View style={styles.messageView}>
					<Text style={styles.message}>
						{message}
					</Text>
				</View>
				<View style={styles.dateView}>
					<Text style={styles.date}>
						{date}
					</Text>
				</View>

				<View style={[
					styles.messageBubbleCorner,
					right && styles.rightMessageBubbleCorner
				]}/>
			</View>
		);
	else {
		const randomWidth = Math.floor(Math.random()*(70-30+1)+30);
		const messageWidth = randomWidth + 20;
		const skeletonMargin = 100 - messageWidth;
		const rightSkeletonStyle = { ...styles.rightSkeleton, ...{ marginLeft: `${skeletonMargin}%` } };

		return (
			<ContentLoader
				style={right ? rightSkeletonStyle : styles.skeleton}
				speed={1}
				width={`${messageWidth}%`}
				height={30}
				backgroundColor={right ? theme.colors.green80 : theme.colors.gray80}
				foregroundColor={right ? theme.colors.green70 : theme.colors.gray70}
			>
				<Rect x="8" y="5" rx="6" ry="6" width={`${randomWidth}%`} height="20" />
				<Rect x="85%" y="7" rx="6" ry="6" width="12%" height="16" />
				<View style={[
					styles.messageBubbleCorner,
					right && styles.rightMessageBubbleCorner
				]}/>
			</ContentLoader>
		);
	}
}