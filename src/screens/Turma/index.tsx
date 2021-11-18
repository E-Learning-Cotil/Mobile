import React, { useEffect, useState } from 'react';

import { View, ScrollView, TouchableOpacity, Text, Modal, TextInput, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { NavBar } from '../../components/NavBar';
import { CardTopico } from '../../components/CardTopico';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';


interface DadosTurma {
	id: number;
	nome: string;
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}
interface Topicos {
	id: number;
	nome: string;
	descricao: string;
}

export function Turma({ route, navigation }: any) {
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [ loading, setLoading ] = useState(true);

	const [ creating, setCreating ] = useState(false);
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ newTopicTitle, setNewTopicTitle ] = useState('');
	const [ newTopicDescription, setNewTopicDescription ] = useState('');

	const [ dados, setDados ] = useState<DadosTurma>();
	const [ topicos, setTopicos ] = useState<Topicos[]>([]);

	async function createNewTopicHandler () {
		if (newTopicTitle !== '' && newTopicDescription !== '') {
			try {
				setCreating(true);

				await api.post('/topicos', {
					idTurma: dados?.id,
					nome: newTopicTitle,
					descricao: newTopicDescription,
				});
				
				await load();
				
				setNewTopicTitle('');
				setNewTopicDescription('');
				setCreating(false);
				setModalVisible(false);
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function getDados() {
		try {
			const {
				data,
				status
			} = await api.get(`/turmas/${id}`);
			setDados(data);
		} catch (error: any) {
			console.log('Error Turma: ', error.response.data.error);
		}

	}

	async function getTopicos() {
		try {
			const {
				data,
				status
			} = await api.get(`/topicos/?idTurma=${id}`);

			setTopicos(data);
		} catch (error: any) {
			console.log('Error Turma: ', error.response.data.error);
		}
	}

	async function load() {
		await getDados();
		await getTopicos();
		setLoading(false);
	}

	useEffect(() => {
		setLoading(true);
		load();
	}, [id]);

	if (!loading) {
		return (
			<View style={[styles.container]}>
				<NavBar
					title={dados?.nome}

					iconName={dados?.icone.altLink}
					color={dados?.cores.corPrim}
				/>

				<ScrollView style={styles.content}>
					<View style={styles.topicosList}>
						{
							(topicos).map(topico => {
								const id = topico.id;
								const title = topico.nome;
								const descricao = topico.descricao;

								return <CardTopico
									key={id}
									id={id}
									title={title}
									description={descricao}
								/>
							})
						}
					</View>
				</ScrollView>

				{
					role === 'PROFESSOR' &&
					<View style={styles.buttonView}>
						<TouchableOpacity
							style={[styles.createTopicoButton, { backgroundColor: dados?.cores.corPrim }]}
							onPress={ () => setModalVisible(true) }
						>
							<Text style={styles.createTopicoButtonText}>
								Tópico
							</Text>
							<FontAwesome5 name="plus" size={24} color="white" />
						</TouchableOpacity>
					</View>
				}

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}>
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<Text style={styles.modalText}>
								Nome do tópico:
							</Text>
							<TextInput
								style={styles.modalTextInput}
								onChangeText={setNewTopicTitle}
								value={newTopicTitle}
								placeholder={'(Obrigatório)'}
								placeholderTextColor={theme.colors.gray70}
							/>
							<Text style={styles.modalText}>
								Descrição do tópico:
							</Text>
							<TextInput
								style={{...styles.modalTextInput, ...{ height: 90 }}}
								onChangeText={setNewTopicDescription}
								value={newTopicDescription}
								multiline={true}
								placeholder={'(Obrigatório)'}
								placeholderTextColor={theme.colors.gray70}
							/>

							<TouchableOpacity
								style={[styles.modalButton, { backgroundColor: dados?.cores.corPrim }]}
								onPress={ createNewTopicHandler }
							>
								{
									creating ?
									<ActivityIndicator
										size="large"
										color="#fff"
										animating={true}
									/> :
									<Text style={styles.modalButtonText}>
										Criar
									</Text>
								}
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
	else {
		return (
			<View style={[styles.container]}>
				<NavBar color={theme.colors.highlight} />
				<ScrollView style={styles.content} scrollEnabled={false}>
					{
						[...Array(6)].map((value, index) => {
							return <CardTopico
								key={index}
								loading={true}
							/>
						})
					}
				</ScrollView>
			</View>
		);
	}
}
