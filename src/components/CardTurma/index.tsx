import React from "react";
import { View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import ContentLoader, { Rect } from "react-content-loader/native"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	title?: string;
	subtitle?: string | null;
    iconLink?: string;
    color?: string;
	loading?: boolean;
}

export function CardTurma ({ title, subtitle, iconLink, color, loading = false }: Props) {
	if (!loading)
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
									styles.subtitle,
									subtitle === null && { display: 'none' }
								]} 
								numberOfLines={1}
							>
								{subtitle}
							</Text>
						</View>
					</View>
				</RectButton>
			</View>
		)
	else
		return (
			<ContentLoader
				style={styles.skeleton}
				speed={2}
				width={'100%'}
				height={70}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="20" y="15" rx="5" ry="5" width="40" height="40" />
				<Rect x="72" y="12" rx="6" ry="6" width="70%" height="22" />
				<Rect x="72" y="40" rx="6" ry="6" width="70%" height="18" />
			</ContentLoader>
		)
}