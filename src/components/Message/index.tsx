import React from 'react';
import { getStyledDate, getFormattedDatetime } from '../../utils/moment';

import { View, Text } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	right: boolean;
	message: string;
	date: string;
	lastMessageSameSide: boolean;
	lastMessageDate: string;
}

export function Message({ message, date, right, lastMessageSameSide, lastMessageDate }: Props) {
	const lastStyledDate = getStyledDate(lastMessageDate).toUpperCase();
	const currentStyledDate = getStyledDate(date).toUpperCase();
	const isNewDay = currentStyledDate !== lastStyledDate;
	if (isNewDay) lastMessageSameSide = false;
	date = getFormattedDatetime(date, 'HH:mm');

	return (
		<View>
			<View style={[
				styles.dateLabel,
				!isNewDay && { display: 'none' }
			]}>
				<Text style={styles.dateLabelText}>
					{currentStyledDate}
				</Text>
			</View>

			<View style={[
				styles.container,
				right && styles.rightMessage,
				lastMessageSameSide && { marginTop: 5 },
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
					right && styles.rightMessageBubbleCorner,
					lastMessageSameSide && { borderTopColor: 'transparent' },
				]}/>
			</View>
		</View>
	);
}