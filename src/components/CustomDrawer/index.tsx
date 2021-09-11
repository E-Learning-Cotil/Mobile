import React from 'react';

import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { RectButton } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons'; 

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Avatar } from '../Avatar';
import { ButtonIcon } from '../ButtonIcon';
import {
	View,
	Text,
} from 'react-native';

import { useAuth } from '../../contexts/auth';
import { LabelIcon } from '../LabelIcon';

export function CustomDrawer ({ navigation }: DrawerContentComponentProps) {
	const { user, signOut } = useAuth();

	function handleSignOut () {
		signOut();
	}

	return (
		<View style={styles.container}>
			<View style={styles.userInfoView}>
				<Avatar
					urlImage={user?.foto}
				/>
				<Text>
					
				</Text>
			</View>

			<View style={styles.pageLinksView}>
				<ButtonIcon
					navigation
					title="Home"
					iconName="home"
					routeName=""
					
				/>
				<ButtonIcon
					navigation
					title="Atividades"
					iconName="list"
					routeName=""
				/>
				<ButtonIcon
					navigation
					title="Turmas"
					iconName="book"
					routeName=""
				/>
				<ButtonIcon
					navigation
					title="Boletim"
					iconName="scroll"
					routeName=""
				/>
				<ButtonIcon
					navigation
					title="Conversas"
					iconName="comment-alt"
					routeName=""
				/>
				<ButtonIcon
					navigation
					title="Configurações"
					iconName="cog"
					routeName=""
				/>
			</View>

			<View
				style={styles.signOutView}
			>
				<RectButton
					onPress={handleSignOut}
					style={styles.signOutButton}
				>

					<Text style={styles.text}>Sair</Text>			
					<FontAwesome5 name="sign-out-alt" size={24} color="white" />
				</RectButton>
			</View>
		</View>
	);
}