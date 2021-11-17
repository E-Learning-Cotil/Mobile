import React, { useState, useRef } from "react";

import {
	View,
	Text,
	TextInput,
	ScrollView,
} from "react-native";

import { LabelText } from "../../components/LabelText";
import { NavBar } from "../../components/NavBar";
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from "../../contexts/auth";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import api from "../../services/api";

import { Avatar } from "../../components/Avatar";
import { LabelIcon } from "../../components/LabelIcon";

import * as ImagePicker from 'expo-image-picker';

export function Configuracoes() {
	const { user, updateUser } = useAuth();

	const role = user?.role;
	const color = role === "ALUNO" ? theme.colors.green90 : theme.colors.purple90;

	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);

	const scrollViewRef = useRef<ScrollView>(null);
	const firstTextInputRef = useRef<TextInput>(null);

	const [userState, setUserState] = useState({
		foto: user?.foto || '',
		email: user?.email || '',
		telefone: user?.telefone || '',
		nome: user?.nome || '',
		senha: ''
	});

	async function handleChoosePhoto () {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});

		if (result.cancelled === false) {
			const fileUri = result.uri;
			const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
			const fileExtension = fileName.split('.').pop();

			let formData = new FormData();
			formData.append('file', {
				uri: fileUri,
				name: fileName,
				type: `image/${fileExtension}`
			} as any);

			try {
				const {
					data,
					status
				} = await api.post('/arquivos', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						'basic_token': process.env.BASIC_TOKEN,
					},
				});

				setUserState(prevState => ({ ...prevState, foto: data.link }));
			} catch (error) {
				console.log(error)
			}
		}
	}

	async function configsUpdateHandler () {
		if (user)
		try {
			if (role === 'ALUNO')
			await api.put('/alunos', {
				foto: userState.foto !== user?.foto ? userState.foto : undefined,
				nome: userState.nome !== user?.nome ? userState.nome : undefined,
				email: userState.email !== user?.email ? userState.email : undefined,
				telefone: userState.telefone !== user?.telefone ? userState.telefone : undefined,
				senha: userState.senha,
			});
			else {
				const response = await api.put('/professores', {
					foto: userState.foto !== user?.foto ? userState.foto : undefined,
					nome: userState.nome !== user?.nome ? userState.nome : undefined,
					email: userState.email !== user?.email ? userState.email : undefined,
					telefone: userState.telefone !== user?.telefone ? userState.telefone : undefined,
					senha: userState.senha,
				})

				console.log(response)
			}

			updateUser({ ...user, foto: userState.foto, nome: userState.nome, email: userState.email, telefone: userState.telefone });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={styles.container}>
			<NavBar title="Configurações" iconName="cog" color={color} />
			<ScrollView style={styles.content} ref={scrollViewRef} >
				<View style={styles.avatarView}>
					<View
						style={[styles.avatarBackground, { backgroundColor: color }]}
					></View>
					<Avatar
						urlImage={userState.foto}
						imageBorderRadius={{ borderRadius: 10 }}
						style={styles.avatar}
					/>
					<RectButton
						style={[styles.avatarPicker, !editMode && { zIndex: -1 }]}
						onPress={handleChoosePhoto}
					>
						<View style={styles.avatarPickerView}>
							<Text style={styles.avatarPickerText}>
								Alterar
							</Text>
						</View>
					</RectButton>
				</View>
				<View style={styles.userInfo}>
					<LabelText title="Apelido" color={color} />
					<TextInput
						style={[styles.textConfig, editMode && styles.textEdit]}
						onChangeText={text => setUserState(previousState => ({ ...previousState, nome: text }))}
						value={userState.nome}
						editable={editMode}
						ref={firstTextInputRef}
						onFocus={() => {
							scrollViewRef.current?.scrollTo({ y: 150, animated: true})
						}}
					/>

					<LabelText title="Email" color={color} />
					<TextInput
						style={[styles.textConfig, editMode && styles.textEdit]}
						onChangeText={text => setUserState(previousState => ({ ...previousState, email: text }))}
						value={userState.email}
						editable={editMode}
						onFocus={() => {
							scrollViewRef.current?.scrollTo({ y: 240, animated: true})
						}}
					/>

					<LabelText title="Telefone" color={color} />
					<TextInput
						style={[styles.textConfig, editMode && styles.textEdit]}
						onChangeText={text => setUserState(previousState => ({ ...previousState, telefone: text }))}
						value={userState.telefone}
						editable={editMode}
						onFocus={() => {
							scrollViewRef.current?.scrollTo({ y: 330, animated: true})
						}}
					/>

					<LabelText title={editMode ? 'Nova Senha' : 'Senha'} color={color} />
					<TextInput
						style={[styles.textConfig, editMode && styles.textEdit, { marginBottom: 120 }]}
						secureTextEntry
						onChangeText={text => setUserState(previousState => ({ ...previousState, senha: text }))}
						value={editMode ? userState.senha : '**********'}
						editable={editMode}
						spellCheck={false}
						onFocus={() => {
							scrollViewRef.current?.scrollTo({ y: 420, animated: true})
						}}
					/>
				</View>
			</ScrollView>
			<View style={styles.buttonView}>
				<RectButton
					style={[styles.configButton, { backgroundColor: color }]}
					onPress={() => {
						if (editMode){
							setEditMode(false);
							configsUpdateHandler();
						}
						else {
							setUserState({
								foto: user?.foto || '',
								email: user?.email || '',
								telefone: user?.telefone || '',
								nome: user?.nome || '',
								senha: ''
							});
							setEditMode(true);
							firstTextInputRef.current?.focus();
						}
					}}
				>
					<LabelIcon title={editMode ? "Concluído" : "Editar"} iconName={"pen"} />
				</RectButton>
			</View>
		</View>
	);
}
