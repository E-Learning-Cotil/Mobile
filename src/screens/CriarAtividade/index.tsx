import React, { useEffect, useState, useRef } from 'react';
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
import { getFormattedDatetime } from '../../utils/moment';

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

interface Atividade {
	id?: number;
	nome: string;
	conteudo: string;
	dataInicio: string;
	dataFim: string;
	arquivos: Arquivo[];
}

interface MaskedInput extends TextInputMask, TextInputMaskMethods {}

export function CriarAtividade({ route: { params: { topico } }, navigation }: Props) {
	const { user } = useAuth();

	const [ annexing, setAnnexing ] = useState(false);
	const [ submiting, setSubmiting ] = useState(false);

	const [ atividade, setAtividade ] = useState<Atividade>({
		nome: '',
		conteudo: '',
		dataInicio: '',
		dataFim: '',
		arquivos: [],
	});

	const dateInput1 = useRef<MaskedInput>(null);
	const [ dateInputValid1, setDateInputValid1 ] = useState(false);
	const dateInput2 = useRef<MaskedInput>(null);
	const [ dateInputValid2, setDateInputValid2 ] = useState(false);

	const [ materialValid, setMaterialValid ] = useState(false);

	async function submitHandler() {
		if (materialValid) {
			setSubmiting(true);


			let conteudo = '"<p>' + atividade.conteudo + '</p>"';
			while (conteudo.indexOf('\n') !== -1) conteudo = conteudo.replace('\n', '<br>');
			const arquivos = atividade.arquivos.map(arquivo => arquivo.idArquivo);
			const dataInicio = getFormattedDatetime(atividade.dataInicio, 'UTC', 'DD/MM/YYYY hh:mm');
			const dataFim = getFormattedDatetime(atividade.dataFim, 'UTC', 'DD/MM/YYYY hh:mm');

			try {
				await api.post('/atividades', {
					idTopico: topico.id,
					nome: atividade.nome,
					dataInicio: atividade.dataInicio,
					dataFim: atividade.dataFim,
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
		setAtividade({
			nome: '',
			conteudo: '',
			dataInicio: '',
			dataFim: '',
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

				setAtividade(prevState => ({ ...prevState, arquivos: [ ...prevState.arquivos, { ...data, nome: fileName } ] }));
			}
		} catch (error) {
			console.error(JSON.stringify(error))
		}
		setAnnexing(false);
	}

	function removeAnnexedFile (fileId: number) {
		setAtividade(prevState => ({ ...prevState, arquivos: prevState.arquivos.filter(item => item.idArquivo !== fileId) }));
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
			resetScreen();
		});
	}, []);

	useEffect(() => {
		if (atividade.dataInicio.length === 16 && dateInput1.current?.isValid()) setDateInputValid1(true);
		else setDateInputValid1(false);
	}, [atividade.dataInicio]);

	useEffect(() => {
		if (atividade.dataFim.length === 16 && dateInput2.current?.isValid()) setDateInputValid2(true);
		else setDateInputValid2(false);
	}, [atividade.dataFim]);

	useEffect(() => {
		if (
			atividade.nome !== '' &&
			atividade.conteudo !== ''
		) setMaterialValid(true);
		else setMaterialValid(false);
	}, [atividade]);

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
						value={atividade.nome}
						onChangeText={text => setAtividade(prevState => ({...prevState, nome: text}))}
						style={styles.headerInput}
						placeholder={'Nome da Atividade'}
						placeholderTextColor={theme.colors.gray70}
					/>

<View style={styles.headerDateView}>
						<Text style={styles.headerText}>
							Início:
						</Text>
						<TextInputMask
							type={'datetime'}
							options={{
								format: 'DD/MM/YYYY HH:mm'
							}}
							value={atividade.dataInicio}
							onChangeText={text => {
								setAtividade(prevState => ({...prevState, dataInicio: text}))
							}}
							placeholder={'dd/mm/aaaa --:--'}
							placeholderTextColor={theme.colors.gray70}
							
							style={[styles.headerDate, {
								borderBottomColor: dateInputValid1 ? theme.colors.green80 : theme.colors.red80
							}]}
							keyboardType={'numeric'}
							ref={dateInput1}
						/>
					</View>
					<View style={styles.headerDateView}>
						<Text style={styles.headerText}>
							Fim:
						</Text>
						<TextInputMask
							type={'datetime'}
							options={{
								format: 'DD/MM/YYYY HH:mm'
							}}
							value={atividade.dataFim}
							onChangeText={text => {
								setAtividade(prevState => ({...prevState, dataFim: text}))
							}}
							placeholder={'dd/mm/aaaa --:--'}
							placeholderTextColor={theme.colors.gray70}
							
							style={[styles.headerDate, {
								borderBottomColor: dateInputValid2 ? theme.colors.green80 : theme.colors.red80
							}]}
							keyboardType={'numeric'}
							ref={dateInput2}
						/>
					</View>

					<TextInput
						value={atividade.conteudo}
						onChangeText={text => setAtividade(prevState => ({...prevState, conteudo: text}))}
						style={styles.headerTextArea}
						multiline={true}
						placeholder={'Conteúdo da Atividade'}
						placeholderTextColor={theme.colors.gray70}
					/>
				</View>

				<View style={styles.filesView}>
					<Text style={styles.filesViewTitle}>
						Anexos (Opcionais):
					</Text>

					{
						atividade.arquivos.map((arquivo, index) => {
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
								{ materialValid ? 'Confirmar' : 'Complete o atividade' }
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
