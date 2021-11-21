import React, { useEffect, useState, useRef } from 'react';

import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInputMask, TextInputMaskMethods } from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

import { NavBar } from '../../components/NavBar';
import { PerguntaBuilder } from '../../components/Pergunta/Builder';

import { useAuth } from '../../contexts/auth';
import { getFormattedDatetime } from '../../utils/moment';
import api from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { AxiosError } from 'axios';

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

interface Questao {
	pergunta: string;
	imagem: string | null;
	certo: number;
	alternativas: {
		texto: string;
	}[];
}

interface Teste {
	id?: number;
	nome: string;
	dataInicio: string;
	dataFim: string;
	conteudo: Questao[];
}

interface MaskedInput extends TextInputMask, TextInputMaskMethods {}

export function CriarTeste({ route: { params: { topico } }, navigation }: Props) {
	const { user } = useAuth();
	const role = user?.role;

	const [ loading, setLoading ] = useState(false);
	const [ submiting, setSubmiting ] = useState(false);

	const dateInput1 = useRef<MaskedInput>(null);
	const [ dateInputValid1, setDateInputValid1 ] = useState(false);
	const dateInput2 = useRef<MaskedInput>(null);
	const [ dateInputValid2, setDateInputValid2 ] = useState(false);

	const [ teste, setTeste ] = useState<Teste>({
		nome: '',
		dataInicio: '',
		dataFim: '',
		conteudo: [],
	});

	const [ testeValid, setTesteValid ] = useState(false);

	async function submitHandler() {
		if (testeValid) {
			setSubmiting(true);

			const dataInicio = getFormattedDatetime(teste.dataInicio, 'UTC', 'DD/MM/YYYY hh:mm');
			const dataFim = getFormattedDatetime(teste.dataFim, 'UTC', 'DD/MM/YYYY hh:mm');
			const conteudo = JSON.stringify(teste.conteudo);

			try {
				await api.post('/testes', {
					idTopico: topico.id,
					nome: teste.nome,
					dataInicio,
					dataFim,
					conteudo,
				});

				resetScreen();
				navigation.navigate('Topico', { id: topico.id });
			} catch (error: any) {
				console.error(error.response.data.error);
			}
		}
	}

	function resetScreen() {
		setTesteValid(false);
		setSubmiting(false);
		setDateInputValid1(false);
		setDateInputValid2(false);
		setTeste({
			nome: '',
			dataInicio: '',
			dataFim: '',
			conteudo: [],
		});
	}

	async function cancelHandler() {
		resetScreen();
		navigation.goBack();
	}

	function addQuestionHandler() {
		setTeste(prevState => ({...prevState, conteudo: [ ...prevState.conteudo, {
			pergunta: '',
			imagem: null,
			certo: 0,
			alternativas: [{
				texto: '',
			}]
		}]}))
	}

	function changeQuestionHandler(updatedQuestion: Questao, updatedIndex: number) {
		setTeste(prevState => ({...prevState, conteudo: prevState.conteudo.map((question, index) => {
			if (updatedIndex === index)
				return updatedQuestion
			else
				return question;
		})}))
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
			resetScreen();
		});
	}, []);

	useEffect(() => {
		if (
			teste.nome !== '' &&
			dateInputValid1 &&
			dateInputValid2 &&
			teste.conteudo.every(e => {
				if (
					e.pergunta !== '' &&
					e.alternativas.length >= 2 &&
					e.alternativas.every(e => e.texto !== '')
				) return true;
				else return false;
			})
		) {
			setTesteValid(true);
		}
		else setTesteValid(false);
	}, [teste]);

	useEffect(() => {
		if (teste.dataInicio.length === 16 && dateInput1.current?.isValid()) setDateInputValid1(true);
		else setDateInputValid1(false);
	}, [teste.dataInicio]);

	useEffect(() => {
		if (teste.dataFim.length === 16 && dateInput2.current?.isValid()) setDateInputValid2(true);
		else setDateInputValid2(false);
	}, [teste.dataFim]);

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
						value={teste.nome}
						onChangeText={text => setTeste(prevState => ({...prevState, nome: text}))}
						style={styles.headerInput}
						placeholder={'Nome do Teste'}
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
							value={teste.dataInicio}
							onChangeText={text => {
								setTeste(prevState => ({...prevState, dataInicio: text}))
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
							value={teste.dataFim}
							onChangeText={text => {
								setTeste(prevState => ({...prevState, dataFim: text}))
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
				</View>

				<View style={styles.questionsList}>
					{
						teste.conteudo.map((question, index) => <PerguntaBuilder
							key={index}
							pergunta={question}
							perguntaIndex={index}
							onPerguntaChange={changeQuestionHandler}
							color={topico.turma.cores.corPrim}
						/>)
					}
					<TouchableOpacity
						style={styles.submitButton}
						onPress={ addQuestionHandler }
					>
						<FontAwesome5 name="plus" size={18} color="white" />
						<Text style={[styles.submitButtonText, { marginLeft: 10 }]}>
							Nova Pergunta
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonsView}>
					<TouchableOpacity
						style={[styles.submitButton, { backgroundColor: testeValid ? topico.turma.cores.corPrim : theme.colors.gray90 }]}
						onPress={ submitHandler }
						disabled={!testeValid}
					>
						{
							submiting ?
							<ActivityIndicator
								size="large"
								color="#fff"
								animating={true}
							/> :
							<Text style={styles.submitButtonText}>
								{ testeValid ? 'Confirmar' : 'Complete o teste' }
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
