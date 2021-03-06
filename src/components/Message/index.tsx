import React, { memo } from 'react';
import { getStyledDate, getFormattedDatetime } from '../../utils/moment';

import { View, Text } from 'react-native';
import { DateLabel } from './DateLabel';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	right: boolean;
	message: string;
	date: string;
	lastMessageSameSide: boolean;
	lastMessageDate: string;
	lastMessage: boolean;
	firstMessage: boolean;
	userRole?: 'ALUNO' | 'PROFESSOR';
}

const Message = memo(({ message, date, right, lastMessageSameSide, lastMessageDate, lastMessage, firstMessage, userRole }: Props) => {
	const color = userRole === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const lastStyledDate = getStyledDate(lastMessageDate).toUpperCase();
	const currentStyledDate = getStyledDate(date).toUpperCase();
	const isNewDay = currentStyledDate !== lastStyledDate;
	if (isNewDay) lastMessageSameSide = false;
	date = getFormattedDatetime(date, 'HH:mm');

	return (
		<View>
			<DateLabel visible={!firstMessage ? isNewDay : firstMessage} styledDate={currentStyledDate} />

			<View style={[
				styles.container,
				right && { ...styles.rightMessage, ...{ backgroundColor: color } },
				lastMessageSameSide && { marginTop: 5 },
				lastMessage && { marginBottom: 5 },
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
					right && { ...styles.rightMessageBubbleCorner, ...{ borderTopColor: color } },
					lastMessageSameSide && { borderTopColor: 'transparent' },
				]}/>
			</View>
		</View>
	);
});

export { Message };