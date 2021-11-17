import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { Pergunta } from '../../components/Pergunta';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';


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

	const [ dadosTeste, setDadosTeste ] = useState<DadosTeste>();
	const [ testResult, setTestResult ] = useState<boolean[]>();
	const [ checked, setChecked ] = useState<boolean[]>();

	function setResult ( idAlternative: number, correct: boolean ) {
		console.log(idAlternative, correct)
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
		if (dadosTeste && testResult && checked && checked.every(e => e === true)) {
			let count = 0;

			testResult.map(result => { if (result) count++ })

			const grade = Math.round((count / testResult.length * 10) * 10) / 10;

			try {
				await api.post('/testes-aluno', {
					nota: grade,
					idTeste: dadosTeste.id,
					idTurma: dadosTeste.topicos.turma.id,
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	useEffect(() => {
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

		setLoading(true);
		load();
	}, [id]);

	useEffect(() => {
		console.log(testResult)
	}, [testResult]);

	if (!loading) {
		return (
			<View style={[styles.container]}>
				<NavBar
					title={dadosTeste?.nome}
					iconName={dadosTeste?.topicos.turma.icone.altLink}
					color={dadosTeste?.topicos.turma.cores.corPrim}
				/>

				<ScrollView style={styles.content} >
					<View style={styles.perguntasList}>
						{
							dadosTeste?.testesAlunos.length === 0 ?
							dadosTeste.conteudo.map((pergunta, index) => <Pergunta
								key={index}
								pergunta={pergunta}
								idPergunta={index}
								setResult={setResult}
								color={dadosTeste.topicos.turma.cores.corPrim}
							/>)
							:
							null // TESTE JÀ RESOLVIDO
						}

						<View style={styles.buttonsView}>
							<TouchableOpacity
								style={styles.submitButton}
								onPress={ submitTest }
							>
								<Text style={styles.submitButtonText}>
									Enviar Teste
								</Text>
							</TouchableOpacity>
						</View>
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
					<Text style={{ color: 'red' }} >LOADING</Text>
				</ScrollView>
			</View>
		);
	}
}
