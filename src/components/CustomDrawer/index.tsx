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

export function CustomDrawer ({ navigation }: DrawerContentComponentProps) {
	const { user, signOut } = useAuth();

	function handleSignOut () {
		signOut();
	}

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.userInfoView,
					user?.role === 'ALUNO' ? 
					{ backgroundColor: theme.colors.green90 } :
					{ backgroundColor: theme.colors.purple90 }
				]}
			>
				<Avatar
					urlImage={user?.foto}
				/>
				<View style={styles.userInfoTextView} >
					<Text style={styles.userName} numberOfLines={1} >
						{ user?.nome }
					</Text>
					<Text style={styles.userEmail} numberOfLines={1} >
						{ user?.email }
					</Text>
				</View>
			</View>

			<View style={styles.pageLinksView}>
				<ButtonIcon
					title="Home"
					iconName="home"
					routeName="Home"
					
				/>
				<ButtonIcon
					title="Atividades"
					iconName="list"
					routeName="Atividades"
				/>
				<ButtonIcon
					title="Turmas"
					iconName="book"
					routeName="Turmas"
				/>
				<ButtonIcon
					title="Boletim"
					iconName="scroll"
					routeName="Boletim"
					style={
						user?.role === 'PROFESSOR' && { display: 'none' }
					}
				/>
				<ButtonIcon
					title="Conversas"
					iconName="comment-alt"
					routeName="Conversas"
				/>
				<ButtonIcon
					title="Configurações"
					iconName="cog"
					routeName="Configuracoes"
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