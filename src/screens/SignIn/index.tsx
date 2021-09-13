import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TextInput, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import GreenWave from '../../assets/greenWave.png';
import PurpleWave from '../../assets/purpleWave.png';

import { useAuth } from '../../contexts/auth';
import { Checkbox } from '../../components/Checkbox';


export function SignIn () {
	const [ alunoState, setAlunoState ] = useState(true);
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

	const [ isEmailValid, setEmailStatus ] = useState(false);
	const [ emailValidationMessage, setEmailValidationMessage ] = useState('');

	const [ isPasswordValid, setPasswordStatus ] = useState(false);
	const [ passwordValidationMessage, setPasswordValidationMessage ] = useState('');

	const [ firstOccurrence, setFirstOccurrence ] = useState(true);

	function validateEmail () {
		const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

		if (!firstOccurrence) {
			let message = '';
			let status = true;

			if (email === '') {
				message = 'Obrigatório!';
				status = false;
			}
			else if (!reg.test(email)) {
				message = 'Inválido!';
				status = false;
			}

			setEmailValidationMessage(message);
			setEmailStatus(status);
		}
	}

	function validatePassword() {
		if (!firstOccurrence) {
			let message = '';
			let status = true;

			if (password === '') {
				message = 'Obrigatório!';
				status = false;
			}
			
			setPasswordValidationMessage(message);
			setPasswordStatus(status);
		}
	}

	useEffect(() => { validateEmail(); }, [ email ]);

	useEffect(() => { validatePassword(); }, [ password ]);

	useEffect(() => { setFirstOccurrence(false); }, []);

	const [ submitMessage, setSubmitMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const { signIn } = useAuth();

	async function handleSignIn () {
		setLoading(true);

		validateEmail();
		validatePassword();

		if (isEmailValid && isPasswordValid) {
			const response = await signIn({
				email,
				password,
				role: alunoState ? 'ALUNO' : 'PROFESSOR',
				rememberUser
			});
	
			const { status, message } = response;

			if (isMounted.current)
				if (status === 200)
					setSubmitMessage('');
				else if (status === 400 || status === 401) {
					const roleText = alunoState ? 'aluno' : 'professor';

					setSubmitMessage(`Email ou senha do ${roleText} incorretos!`);
				}
				else setSubmitMessage(message);
		}
		
		if (isMounted.current)
			setLoading(false);
	}

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
		return () => { isMounted.current = false };
	}, []);

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
					{ /*Campo Email*/ }
					<View style={styles.inputView}>
						<FontAwesome5
							name="user" size={24}
							color={theme.colors.gray90}
						/>
						<TextInput
							style={styles.input}
							onChangeText={setEmail}
							value={email}
							placeholder="E-mail"
							autoCompleteType="email"
							keyboardType="email-address"
						/>

						<Text style={ styles.validationMessage } >
							{emailValidationMessage}
						</Text>
					</View>

					{ /*Campo Senha*/ }
					<View style={styles.inputView}>
						<FontAwesome5
							name="lock" size={24}
							color={theme.colors.gray90}
						/>
						<TextInput
							style={styles.input}
							onChangeText={setPassword}
							value={password}
							placeholder="Senha"
							autoCompleteType="password"
							secureTextEntry={true}
						/>

						<Text style={ styles.validationMessage } >
							{passwordValidationMessage}
						</Text>
					</View>
				</View>

				<View style={styles.checkboxView}>
					<Checkbox
						checkboxState={rememberUser}
						setCheckboxState={setRememberUser}
					/>

					<Text style={styles.checkboxText}>Lembrar Usuário</Text>
				</View>

				<Text style={ styles.submitMessage } >
					{submitMessage}
				</Text>

				<View
					style={styles.accessButtonView}
				>
					<RectButton
						onPress={handleSignIn}
						style={styles.accessButton}
						enabled={!loading}
					>
						<Text
							style={[
								styles.accessButtonText,
								loading && { display: 'none' }
							]}
						>
							Entrar
						</Text>
						<ActivityIndicator
							size="large"
							color="#fff"
							animating={loading}
							style={ !loading && { display: 'none' } }
						/>
					</RectButton>
				</View>
			</View>
		</View>
	)
}