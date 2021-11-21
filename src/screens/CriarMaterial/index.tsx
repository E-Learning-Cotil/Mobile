import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInputMask, TextInputMaskMethods } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';

import { NavBar } from '../../components/NavBar';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	route: {
		params: {
			topico: {
				id: number;
				nome: string;
				descricao: string;
				turma: {
					nome: string;
					cores: {
						corPrim: string;
						corSec: string;
					}
					icone: {
						altLink: string;
					}
				}
			}
		}
	}
	navigation: any;
}

interface Arquivo {
	idArquivo: number;
	link: string;
	name: string;
	nome: string;
}

interface Material {
	id?: number;
	nome: string;
	conteudo: string;
	arquivos: Arquivo[];
}

export function CriarMaterial({ route: { params: { topico } }, navigation }: Props) {
	const { user } = useAuth();

	const [ annexing, setAnnexing ] = useState(false);
	const [ submiting, setSubmiting ] = useState(false);

	const [ material, setMaterial ] = useState<Material>({
		nome: '',
		conteudo: '',
		arquivos: [],
	});

	const [ materialValid, setMaterialValid ] = useState(false);

	async function submitHandler() {
		if (materialValid) {
			setSubmiting(true);

			let conteudo = '"<p>' + material.conteudo + '</p>"';
			while (conteudo.indexOf('\n') !== -1) conteudo = conteudo.replace('\n', '<br>');
			const arquivos = material.arquivos.map(arquivo => arquivo.idArquivo);

			try {
				await api.post('/materiais', {
					idTopico: topico.id,
					nome: material.nome,
					conteudo,
					arquivos,
				});

				resetScreen();
				navigation.navigate('Topico', { id: topico.id, forceReload: true });
			} catch (error: any) {
				console.error(error.response.data.error);
			}
		}
	}

	function resetScreen() {
		setMaterialValid(false);
		setSubmiting(false);
		setMaterial({
			nome: '',
			conteudo: '',
			arquivos: [],
		});
	}

	async function cancelHandler() {
		resetScreen();
		navigation.goBack();
	}

	async function annexFile () {
		setAnnexing(true);
		try {
			let response = await DocumentPicker.getDocumentAsync({});

			if(response.type !== 'cancel')
			{
				if (Platform.OS === 'android' && response.uri[0] === '/') {
					response.uri = `file://${response.uri}`;
					response.uri = response.uri.replace(/%/g, '%25');
				  }
				  
				const fileUri = response.uri;
				const fileName = response.name;

				const formData = new FormData();
				formData.append('file', {
					uri: fileUri,
					name: fileName,
					type: 'multipart/form-data'
				} as any);

				const { data } = await api.post('/arquivos-professor', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				setMaterial(prevState => ({ ...prevState, arquivos: [ ...prevState.arquivos, { ...data, nome: fileName } ] }));
			}
		} catch (error) {
			console.error(JSON.stringify(error))
		}
		setAnnexing(false);
	}

	function removeAnnexedFile (fileId: number) {
		setMaterial(prevState => ({ ...prevState, arquivos: prevState.arquivos.filter(item => item.idArquivo !== fileId) }));
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
			resetScreen();
		});
	}, []);

	useEffect(() => {
		if (
			material.nome !== '' &&
			material.conteudo !== ''
		) setMaterialValid(true);
		else setMaterialValid(false);
	}, [material]);

	return (
		<View style={[styles.container]}>
			<NavBar
				title={topico.turma.nome}
				iconName={topico.turma.icone.altLink}
				color={topico.turma.cores.corPrim}
			/>

			<ScrollView style={styles.content} >
				<View style={styles.header}>
					<TextInput
						value={material.nome}
						onChangeText={text => setMaterial(prevState => ({...prevState, nome: text}))}
						style={styles.headerInput}
						placeholder={'Nome do Material'}
						placeholderTextColor={theme.colors.gray70}
					/>

					<TextInput
						value={material.conteudo}
						onChangeText={text => setMaterial(prevState => ({...prevState, conteudo: text}))}
						style={styles.headerTextArea}
						multiline={true}
						placeholder={'Conteúdo do Material'}
						placeholderTextColor={theme.colors.gray70}
					/>
				</View>

				<View style={styles.filesView}>
					<Text style={styles.filesViewTitle}>
						Anexos (Opcionais):
					</Text>

					{
						material.arquivos.map((arquivo, index) => {
							return <View style={styles.annexedFileView} key={index}>
								<View style={styles.fileNameView}>
									<FontAwesome5 name={'file'} size={24} color='black' />	
									<Text 
										style={styles.fileName} 
										numberOfLines={1}
									>
										{arquivo.nome}
									</Text> 	
								</View>		

								<TouchableOpacity 
									style={[styles.removeFileButton, { backgroundColor: topico.turma.cores.corPrim }]}
									onPress={() => removeAnnexedFile(arquivo.idArquivo)}
								>
									<FontAwesome5 name={'window-close'} size={24} color='white' />
								</TouchableOpacity>
							</View>
						})

					}	

					<TouchableOpacity 
						style={[styles.addFileButton, { backgroundColor: topico.turma.cores.corPrim  }]}
						onPress={annexFile}
					>
						{
							annexing ?
							<ActivityIndicator
								size="large"
								color="#fff"
								animating={true}
							/> :
							<Text style={styles.submitButtonText}>
								Adicionar arquivo
							</Text>
						}
					</TouchableOpacity>
				</View>

				<View style={styles.buttonsView}>
					<TouchableOpacity
						style={[styles.submitButton, { backgroundColor: materialValid ? topico.turma.cores.corPrim : theme.colors.gray90 }]}
						onPress={ submitHandler }
						disabled={!materialValid}
					>
						{
							submiting ?
							<ActivityIndicator
								size="large"
								color="#fff"
								animating={true}
							/> :
							<Text style={styles.submitButtonText}>
								{ materialValid ? 'Confirmar' : 'Complete o material' }
							</Text>
						}
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.submitButton, { backgroundColor: !submiting ? topico.turma.cores.corSec : theme.colors.gray90 }]}
						onPress={ cancelHandler }
						disabled={submiting}
					>
						<Text style={styles.submitButtonText}>
							Cancelar
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
