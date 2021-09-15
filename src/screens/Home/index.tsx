import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator, ScrollView } from 'react-native';

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
		link: string;
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
		link: string;
	};
}

export function Home(){
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const [ loading, setLoading ] = useState(true);

	const [ atividades, setAtividades ] = useState<Atividade[]>([]);
	const [ turmas, setTurmas ] = useState<TurmaAluno[] | TurmaProfessor[]>([]);

	useEffect(() => {
		async function getAtividadesAndTurmas() {
			if (role === 'ALUNO') {
				const {	
					data,
					status 
				} = await api.get('/pagina-inicial'); 

				setAtividades(data.atividades);
				setTurmas(data.turmas);
			}
			else
			{
				const {	
					data,
					status 
				} = await api.get('/turmas/list-by-role'); 

				setTurmas(data);	
			}
			
			setLoading(false);
		}

		getAtividadesAndTurmas();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Home" iconName="home"
				color={color}
			/>

			<ScrollView style={styles.content}>
				{
					role === 'ALUNO'
					&&
					<View style={styles.atividades}>
						<LabelText title="Atividades" color={color}/>
						<View style={styles.atividadesList}>
							<ActivityIndicator color="#fff" size='large' animating={loading} style={ !loading && { display: 'none' } } />
							{
								atividades.map(atividade => {
									const key = atividade.id + atividade.tipo;
									const text = atividade.nome;
									const date = atividade.dataFim.slice(5, 10);
									const formatedDate = date.split('-')[1] + '/' + date.split('-')[0];


									return <CardAtividade key={key} color={color} text={text} date={formatedDate} />
								})
							}
						</View>
					</View>
				}

				<View style={styles.turmas}>
					<LabelText title="Turmas" color={color}/>
					<View style={styles.turmasList}>
						{
							role === 'ALUNO' ?
							(turmas as TurmaAluno[]).map(turma => {
								const key = turma.id;
								const title = turma.nome;
								const professor = turma.professor.nome;
								const link = turma.icone.link;
								const color = turma.cores.corPrim;

								return <CardTurma key={key} title={title} color={color} subtitle={professor} iconLink={link} />
							})
							:
							(turmas as TurmaProfessor[]).map(turma => {
								const key = turma.id;
								const title = turma.nome;
								const subtitle = turma.serie.ano + ' ' + turma.serie.sigla;
								const link = turma.icone.link;
								const color = turma.cores.corPrim;

								return <CardTurma
									key={key} 
									title={title} 
									color={color}
									subtitle={subtitle} 
									iconLink={link} 
								/>
							})
						}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}