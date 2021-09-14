import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

interface Props {
	color: string;
	text: string;
	date: string;
}

export function CardAtividade ({ color, text, date }: Props) {
	return (
		<View style={styles.container}>
			<RectButton style={styles.button}>
				<View style={styles.row}>
					<FontAwesome5 name="bookmark" size={24} color={color} />
					<Text style={styles.text} numberOfLines={1}>
						{text}
					</Text>
				</View>
				<View style={styles.row}>
					<FontAwesome5 name="calendar-alt" size={24} color={color} />
					<Text style={styles.text}>
						{date}
					</Text>
				</View>
			</RectButton>
		</View>
	)
}