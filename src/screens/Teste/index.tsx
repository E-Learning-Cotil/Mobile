import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

import { NavBar } from '../../components/NavBar';
import { Pergunta } from '../../components/Pergunta';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { getFormattedDatetime, getDatetimeColor, showTimePassed } from '../../utils/moment';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface DadosTeste {
	id: number;
	conteudo: {
		alternativas: {
			texto: string;
		}[];
		certo: number;
		imagem: string | null;
		pergunta: string;
	}[];
	dataInicio: string;
	dataFim: string;
	nome: string;
	testesAlunos: {
		id: number;
		dataEnvio: string;
		nota: string;
	}[];
	topicos: {
		id: number;
		nome: string;
		descricao: string;
		turma: {
			id: number;
			nome: string;
			idSerie: number;
			rgProfessor: string;
			cores: {
				corPrim: string;
				corSec: string;
			}
			icone: {
				link: string;
				altLink: string;
			}
		}
	}
}

export function Teste({ route, navigation }: any) {
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [ loading, setLoading ] = useState(true);
	const [ submiting, setSubmiting ] = useState(false);

	const [ dadosTeste, setDadosTeste ] = useState<DadosTeste>();
	const [ testResult, setTestResult ] = useState<boolean[]>();
	const [ checked, setChecked ] = useState<boolean[]>();

	const status = dadosTeste ? getDatetimeColor(dadosTeste.dataFim) : 'red';

	function setResult ( idAlternative: number, correct: boolean ) {
		setChecked(prevState => prevState?.map((prev, index) => {
			if (index === idAlternative)
				return true;
			else
				return prev;
		}));

		setTestResult(prevState => prevState?.map((result, index) => {
			if (index === idAlternative)
				return correct;
			else
				return result;
		}));
	}

	async function submitTest () {
		if (dadosTeste && testResult && checked) {
			setSubmiting(true);
			let count = 0;

			testResult.map(result => { if (result) count++ })

			const grade = Math.round((count / testResult.length * 10) * 10) / 10;

			try {
				await api.post('/testes-aluno', {
					nota: grade,
					idTeste: dadosTeste.id,
					idTurma: dadosTeste.topicos.turma.id,
				});

				await load();
				setSubmiting(false);
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function getDadosTeste() {
		const {
			data,
			status
		} = await api.get(`/testes/${id}`);

		data.conteudo = JSON.parse(data.conteudo);

		setDadosTeste(data);
		setTestResult([...Array(data.conteudo.length).fill(false)]);
		setChecked([...Array(data.conteudo.length).fill(false)]);
	}

	async function load() {
		await getDadosTeste();
		setLoading(false);
	}

	useEffect(() => {
		setLoading(true);
		load();
	}, [id]);

	if (!loading && dadosTeste) {
		const respondido = dadosTeste.testesAlunos.length !== 0;

		return (
			<View style={[styles.container]}>
				<NavBar
					title={dadosTeste?.topicos.turma.nome}
					iconName={dadosTeste?.topicos.turma.icone.altLink}
					color={dadosTeste?.topicos.turma.cores.corPrim}
				/>

				<ScrollView style={styles.content} >
					<View style={styles.perguntasList}>
						<View style={styles.header}>
							<Text style={styles.headerTitle}>
								{ dadosTeste?.nome }
							</Text>
							<Text style={styles.headerTitle}>
								{ dadosTeste?.topicos.nome }
							</Text>
							<Text style={styles.headerSubtitle}>
								{
									!respondido ?
									'Data de Entrega: \n' :
									`Entregue ${showTimePassed(dadosTeste.testesAlunos[0].dataEnvio)}`
								}
								{
									!respondido &&
									<Text style={[
										styles.headerSubtitle,

										status === 'red' ?
										{color: theme.colors.red80} :
										status === 'yellow' ?
										{color: theme.colors.yellow80} :
										status === 'green' &&
										{color: theme.colors.green80}
									]} >{ getFormattedDatetime(dadosTeste.dataFim, 'LLL') }</Text>
								}
							</Text>
						</View>

						{
							!respondido ?
							dadosTeste.conteudo.map((pergunta, index) => <Pergunta
								key={index}
								pergunta={pergunta}
								idAlternative={index}
								setResult={setResult}
								color={dadosTeste.topicos.turma.cores.corPrim}
							/>)
							:
							<View style={styles.alreadyAnsweredView}>
								<View style={styles.alreadyAnsweredTitleView}>
									<FontAwesome5 name="check" size={18} color="white"/>
									<Text style={styles.alreadyAnsweredTitle}>
										Teste respondido!
									</Text>
								</View>
								<Text style={styles.alreadyAnsweredGrade}>
									Nota: { dadosTeste.testesAlunos[0].nota }
								</Text>

								<View style={styles.buttonsView}>
									<TouchableOpacity
										style={styles.goBackButton}
										onPress={ () => navigation.goBack() }
									>
										<Text style={styles.goBackButtonText}>
											Voltar
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						}

						{
							!respondido &&
							<View style={styles.buttonsView}>
								<TouchableOpacity
									style={[styles.submitButton, !checked?.every(e => e === true) && { backgroundColor: theme.colors.gray90 }]}
									onPress={ submitTest }
									disabled={!checked?.every(e => e === true)}
								>
									<Text style={styles.submitButtonText}>
										{
											submiting ?
											<ActivityIndicator
												size="large"
												color="#fff"
												animating={true}
											/> :
											checked?.every(e => e === true) ?
											'Enviar Teste' :
											'Responda todas as questões'
										}
									</Text>
								</TouchableOpacity>
							</View>
						}
					</View>
				</ScrollView>
			</View>
		);
	}
	else {
		return (
			<View style={[styles.container]}>
				<NavBar color={theme.colors.highlight} />
				<ScrollView style={styles.content} scrollEnabled={false}>
					<ContentLoader
						style={styles.skeleton}
						speed={1}
						width={'100%'}
						height={65}
						backgroundColor={theme.colors.gray80}
						foregroundColor={theme.colors.gray70}
					>
						<Rect x="20%" y="5" rx="6" ry="6" width="60%" height="18" />
						<Rect x="15%" y="28" rx="6" ry="6" width="70%" height="16" />
						<Rect x="10%" y="48" rx="6" ry="6" width="80%" height="16" />
					</ContentLoader>
					{
						[...Array(6)].map((value, index) => {
							return <ContentLoader
								key={index}
								style={{...styles.skeleton, ...{ backgroundColor: theme.colors.gray90 }}}
								speed={2}
								width={'100%'}
								height={180}
								backgroundColor={theme.colors.gray80}
								foregroundColor={theme.colors.gray70}
							>
								<Rect x="8" y="15" rx="6" ry="6" width="60%" height="18" />
								<Circle cx="28" cy="52" r="11" />
								<Circle cx="28" cy="52" r="8" />
								<Rect x="45" y="44" rx="6" ry="6" width="58%" height="16" />
								<Circle cx="28" cy="87" r="11" />
								<Circle cx="28" cy="87" r="8" />
								<Rect x="45" y="79" rx="6" ry="6" width="65%" height="16" />
								<Circle cx="28" cy="122" r="11" />
								<Circle cx="28" cy="122" r="8" />
								<Rect x="45" y="114" rx="6" ry="6" width="55%" height="16" />
								<Circle cx="28" cy="157" r="11" />
								<Circle cx="28" cy="157" r="8" />
								<Rect x="45" y="149" rx="6" ry="6" width="65%" height="16" />
							</ContentLoader>
						})
					}
				</ScrollView>
			</View>
		);
	}
}
