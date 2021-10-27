import React, { useEffect, useState } from 'react';
import { getFormattedDatetime } from '../../utils/moment'

import { View, ScrollView } from 'react-native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

interface Atividade {
	id: number;
	tipo: string;
	dataFim: string;
	nome: string;
}

interface TurmaAluno {
	id: number;
	nome: string;
	professor: {
		nome: string;
	};
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}

interface TurmaProfessor {
	id: number;
	nome: string;
	serie: {
		ano: string;
		sigla: string;
	};
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}

export function Home({ navigation }: any){
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const [ loading, setLoading ] = useState(true);

	const [ atividades, setAtividades ] = useState<Atividade[]>([]);
	const [ turmas, setTurmas ] = useState<TurmaAluno[] | TurmaProfessor[]>([]);

	useEffect(() => {
		async function getAtividadesAndTurmas() {
			if (role === 'ALUNO') {
				try {
					const {	
						data,
						status 
					} = await api.get('/pagina-inicial'); 
	
					setAtividades(data.atividades);
					setTurmas(data.turmas);
					setLoading(false);
				} catch (error: any) {
					console.log('Error Home Aluno: ', error.response.data.error);
				}				
			}
			else
			{
				try {
					const {	
						data,
						status 
					} = await api.get('/turmas/list-by-role'); 
	
					setTurmas(data);
					setLoading(false);
				} catch (error: any) {
					console.log('Error Home Professor: ', error.response.data.error);
				}
				
			}
		}

		getAtividadesAndTurmas();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Home" iconName="home"
				color={color}
			/>

			<ScrollView style={styles.content} scrollEnabled={!loading}>
				{
					role === 'ALUNO'
					&&
					<View style={styles.atividades}>
						<LabelText title="Atividades" color={color}/>
						<View style={styles.atividadesList}>
							{
								loading
								?
								[...Array(6)].map((value, index) => {
									return <CardAtividade 
										key={index} 
										loading={true}
									/>
								})
								:
								atividades.map(atividade => {
									const key = atividade.id + atividade.tipo;
									const text = atividade.nome;
									const date = getFormattedDatetime(atividade.dataFim, "DD/MM");
									const idAtividade = atividade.id;


									return <CardAtividade 
										key={key} 
										color={color} 
										text={text}
										date={date} 
										id={idAtividade}
									/>
								})
							}
						</View>
					</View>
				}

				<View style={styles.turmas}>
					<LabelText title="Turmas" color={color}/>
					<View style={styles.turmasList}>
						{
							loading
							?
							[...Array(6)].map((value, index) => {
								return <CardTurma 
									key={index} 
									loading={true}
								/>
							})
							:
							(role === 'ALUNO'
							?
							(turmas as TurmaAluno[]).map(turma => {
								const key = turma.id;
								const title = turma.nome;
								const professor = `Professor(a): ${turma.professor.nome}`;
								const link = turma.icone.altLink;
								const color = turma.cores.corPrim;
								const id = turma.id;

								return <CardTurma 
									key={key} 
									title={title} 
									color={color} 
									subtitle={professor} 
									iconLink={link} 
									id={id}
								/>
							})
							:
							(turmas as TurmaProfessor[]).map(turma => {
								const key = turma.id;
								const title = turma.nome;
								const subtitle = turma.serie.ano + ' ' + turma.serie.sigla;
								const link = turma.icone.altLink;
								const color = turma.cores.corPrim;
								const id = turma.id;

								return <CardTurma
									key={key} 
									title={title} 
									color={color}
									subtitle={subtitle} 
									iconLink={link} 
									id={id}
								/>
							}))
						}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}