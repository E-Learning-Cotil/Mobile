import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	color?: string;
	text?: string;
	date?: string;
	loading?: boolean;
}

export function CardAtividade ({ color, text, date, loading = false }: Props) {

	if (!loading)
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
		);
	else
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={2}
				width={'49%'}
				height={90}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="20" y="16" rx="6" ry="6" width="80%" height="24" />
				<Rect x="20" y="50" rx="6" ry="6" width="80%" height="24" />
			</ContentLoader>
		);
}