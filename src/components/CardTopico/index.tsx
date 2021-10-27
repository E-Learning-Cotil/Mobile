import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

interface Props {
	title?: string;
	description?: string | null;
	loading?: boolean;
	id?: number;
}

export function CardTopico ({ title, description, loading = false, id}: Props) {
	const navigation = useNavigation();
	if (!loading)
		return (
			<View style={styles.container}>
				<RectButton 
					style={styles.button} 
					onPress={() => {navigation.navigate("Topico" as never, { id: id } as never)}}
				>

						
							<Text 
								style={[ 
									styles.text,
									styles.title 
								]} 
								numberOfLines={1}
							>
								{title}
							</Text> 


							<Text
								style={[ 
									styles.text,
									styles.subtitle 
								]} 
								numberOfLines={2}
							>
								{description}
							</Text>

				</RectButton>
			</View>
		)
	else
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={'100%'}
				height={100}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="6%" y="12" rx="6" ry="6" width="88%" height="22" />
				<Rect x="6%" y="40" rx="6" ry="6" width="88%" height="18" />
				<Rect x="6%" y="64" rx="6" ry="6" width="88%" height="18" />
			</ContentLoader>
		)
}