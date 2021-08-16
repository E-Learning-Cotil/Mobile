import React from 'react';
import {
	View,
	ImageBackground,
	Text,
	Image
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import Background from '../../assets/landingPageBackground.png';
import LogoImage from '../../assets/icon.png';

export function LandingPage () {
	const navigation = useNavigation();

	function handleAccessClick () {
		navigation.navigate('SignIn');
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={Background}
				resizeMode="cover"
				style={styles.background}
			>
				<Text style={styles.title}>
					E - Learning
				</Text>

				<Image
					source={LogoImage}
					style={styles.image}
					resizeMode="stretch"
				/>

				<RectButton
					onPress={handleAccessClick}
					style={styles.button}
				>
					<Text style={styles.buttonText}>
						Acessar
					</Text>
				</RectButton>
			</ImageBackground>
		</View>
	);
}