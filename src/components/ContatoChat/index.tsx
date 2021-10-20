import React from 'react';
import { getStyledDatetime } from '../../utils/moment';

import { View, Image, Text } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Circle, Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	loading: boolean;
	id?: string;
	avatar?: string;
	name?: string;
	message?: string;
	date?: string;
	navigation?: any;
}

export function ContatoChat({ loading, id, avatar, name, message, date, navigation }: Props){
	if (!loading && date) {
		date = getStyledDatetime(date);

		return (
			<View style={styles.container}>
				<RectButton
					style={styles.button}
					onPress={() => {
						navigation.navigate('Conversa', { id: id, name: name });
					}}
				>
					<View style={styles.avatarView}>
						<Image
							source={{ uri: avatar }}
							style={styles.avatar}
						/>
					</View>
					<View style={styles.textView}>
						<View style={styles.nameView}>
							<Text style={styles.name} numberOfLines={1}>
								{name}
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
	} else {
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={'100%'}
				height={70}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Circle cx="35" cy="35" r="25" />
				<Rect x="70" y="10" rx="6" ry="6" width="50%" height="22" />
				<Rect x="70" y="44" rx="6" ry="6" width="40%" height="16" />
				<Rect x="85%" y="13" rx="6" ry="6" width="10%" height="16" />
			</ContentLoader>
		);
	}
}