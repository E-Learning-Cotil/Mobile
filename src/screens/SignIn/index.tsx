import React, { useState } from 'react';
import {
	View,
	Image,
	Text,
	TextInput
} from 'react-native';

import { RectButton, Switch } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons'; 

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import GreenWave from '../../assets/greenWave.png';
import PurpleWave from '../../assets/purpleWave.png';

import { Checkbox } from '../../components/Checkbox';

export function SignIn () {
	const [ alunoState, setAlunoState ] = useState(false);
	const [ professorState, setProfessorState ] = useState(false);
	const [ rememberUser, setRememberUser ] = useState(false);

	function handleAlunoSelect () {
		if (!alunoState) {
			setAlunoState(true);
			setProfessorState(false);
		}
	}

	function handleProfessorSelect () {
		if (!professorState) {
			setProfessorState(true);
			setAlunoState(false);
		}
	}

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return(
		<View style={styles.container}>
			<Image
				source={GreenWave}
				style={styles.topImage}
				resizeMode="stretch"
			/>

			<Image
				source={PurpleWave}
				style={styles.bottomImage}
				resizeMode="stretch"
			/>
			
			<View style={styles.pageTitleView}>
				<Text style={styles.greenTitle}>
					log
				</Text>
				<Text style={styles.purpleTitle}>
					in
				</Text>
			</View>
			
			<View style={styles.form}>
				<View style={styles.rolesView}>
					<View
						style={[
							styles.roleView,
							alunoState ? styles.roleViewAluno : null
						]}
					>
						<RectButton
							onPress={handleAlunoSelect}
							style={styles.roleButton}
						>
							<FontAwesome5 name="user-graduate" size={24} color="white" />
							<Text style={styles.roleButtonText}>Sou Aluno</Text>
						</RectButton>
					</View>
					<View
						style={[
							styles.roleView,
							professorState ? styles.roleViewProfessor : null
						]}
					>
						<RectButton
							onPress={handleProfessorSelect}
							style={styles.roleButton}
						>
							<FontAwesome5 name="chalkboard-teacher" size={24} color="white" />
							<Text style={styles.roleButtonText}>Sou Professor</Text>
						</RectButton>
					</View>
				</View>

				<View style={styles.inputsView}>
					<View style={styles.inputView}>
						<FontAwesome5 name="user" size={24} color={theme.colors.gray90} />
						<TextInput
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							placeholder="E-mail"
							autoCompleteType="email"
							keyboardType="email-address"
						/>
					</View>

					<View style={styles.inputView}>
						<FontAwesome5 name="lock" size={24} color={theme.colors.gray90} />
						<TextInput
							style={styles.input}
							onChangeText={setPassword}
							value={password}
							placeholder="Senha"
							autoCompleteType="password"
							secureTextEntry={true}
						/>
					</View>
				</View>

				 <View style={styles.checkboxView}>
					<Checkbox
						checkboxState={rememberUser}
						setCheckboxState={setRememberUser}
					/>

					<Text style={styles.checkboxText}>Lembrar Usuário</Text>
				 </View> 
				<View
					style={styles.accessButtonView}
				>
					<RectButton
						onPress={() => {}}
						style={styles.accessButton}
					>
						<Text style={styles.accessButtonText}>
							Acessar
						</Text>
					</RectButton>
				</View>
			</View>
		</View>
	)
}