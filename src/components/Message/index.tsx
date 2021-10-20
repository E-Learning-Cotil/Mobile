import React from 'react';
import { getStyledDatetime } from '../../utils/moment';

import { View, Text } from 'react-native';
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	loading: boolean;
	right: boolean;
	message?: string;
	date?: string;
}

export function Message({ loading, message, date, right }: Props) {
	if (!loading && date) {
		date = getStyledDatetime(date);

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
	} else {
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