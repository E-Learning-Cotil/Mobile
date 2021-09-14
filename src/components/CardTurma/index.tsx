import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

interface Props {
	title: string;
	nomeProfessor: string;
    iconLink: string;
    color: string;
}

export function CardTurma ({ title, nomeProfessor, iconLink, color }: Props) {
	return (
		<View style={styles.container}>
			<RectButton style={styles.button}>
				<View style={styles.row}>
                    <View 
                    	style={[
                        	styles.iconView,
							{ backgroundColor: color }
                        ]}
                    >
                        <Image
                            source={{ uri: iconLink }}
                            style={ styles.icon }
                        />
                    </View>
					

					<View style={styles.column}>
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
                                styles.nameProfessor 
                            ]} 
                            numberOfLines={1}
                        >
							{nomeProfessor}
						</Text>
					</View>
				</View>
			</RectButton>
		</View>
	)
}