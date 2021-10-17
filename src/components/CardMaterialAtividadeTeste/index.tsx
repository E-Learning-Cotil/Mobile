import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FontAwesome5 } from '@expo/vector-icons'; 


interface Props {
	id?: number;
	type?: number;
	title?: string;

	loading?: boolean;
	navigation : any;

}

export function CardMaterialAtividadeTeste ({ title, type, loading = false, navigation, id}: Props) {
	var pagina = "";
	var nomeIcone = "";

	switch(type){
		case 1: //Material
			pagina = "Material";
			nomeIcone = "book";
			break;
		case 2:
			pagina = "Atividade";
			nomeIcone = "file-signature";
			break;
		case 3:
			pagina = "Teste";
			nomeIcone = "clipboard-list";
			break;
	}
	
	if (!loading)
		return (
			<View style={styles.container}>
				<RectButton 
					style={styles.button} 
					onPress={() => {
						navigation?.navigate(pagina, { id: id })
					}}
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

							<View style={styles.iconDiv}>
								<FontAwesome5 name={nomeIcone} size={24} color="black" />
							</View>
				</RectButton>
			</View>
		)
	else
		return (
			<ContentLoader
				rtl
				style={styles.skeleton}
				speed={1}
				width={'100%'}
				height={46}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="0" y="0" rx="16" ry="16" width="25%" height="46" />
				<Rect x="30%" y="12" rx="6" ry="6" width="65%" height="22" />
			</ContentLoader>
		)
}