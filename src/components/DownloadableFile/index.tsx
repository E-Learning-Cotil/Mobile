import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";


interface Props {
	id?: number;
	
	type?: number;
	title?: string;
	color?: string;

	loading?: boolean;
}

export function DownloadableFile ({ id, type, title, color, loading = false}: Props) {
	const navigation = useNavigation();

	if (!loading)
		return (
			<View style={styles.container}>
				<RectButton 
					style={styles.button} 
					onPress={() => {
					
						navigation.navigate('pagina' as never, { id: id } as never)
					}}
				>
					<View style={styles.row}>
						<Text 
							style={[ 
								styles.text,
								styles.title 
							]} 
							numberOfLines={1}
						>
							sim!!!!
						</Text> 

						<View style={[styles.iconDiv, {backgroundColor: color}]}>
							<FontAwesome5 name={"file"} size={24} color="white" />
						</View>
					</View>
							
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
				<Rect x="75%" y="0" rx="16" ry="16" width="25%" height="100" />
				<Rect x="5%" y="38" rx="6" ry="6" width="65%" height="22" />
			</ContentLoader>
		)
}