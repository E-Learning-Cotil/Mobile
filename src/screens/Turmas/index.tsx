import React, { useEffect, useState } from 'react';

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

interface Turma {
	id: number;
	nome: string;
	professor: {
		nome: string;
	};
	serie: {
		ano: string;
		sigla: string;
	}
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}

export function Turmas({ navigation }: any){
	const { user } = useAuth();
	const role = user?.role;
	const color = user?.role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90

	const [ loading, setLoading ] = useState(true);

	const [ turmas, setTurmas ] = useState<Turma[]>([]);

	useEffect(() => {
		async function getTurmas() {
			try{
			const {
				data,
				status
			} = await api.get('/turmas/list-by-role');

			setTurmas(data);
			setLoading(false);
			} catch (error: any) {
				console.log('Error Turmas: ', error.response.data.error);
			}	
		}

		getTurmas();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Turmas" iconName="book"
				color={color}
			/>

			<ScrollView style={styles.content} scrollEnabled={!loading}>
				
				<View style={styles.turmas}>
					<View style={styles.turmasList}>
						{
							loading ?
							[...Array(6)].map((value, index) => {
								return <CardTurma 
									key={index} 
									loading={true} 
									navigation = {navigation} 
									id = {index}
								/>
							})
							:
							(role === 'ALUNO'
							?
							(turmas).map(turma => {
								const title = turma.nome;
								const professor = `Professor(a): ${turma.professor.nome}`;
								const link = turma.icone.altLink;
								const color = turma.cores.corPrim;
								const id = turma.id;

								return <CardTurma 
									key={id}
									title={title} 
									color={color} 
									subtitle={professor} 
									iconLink={link} 
									navigation = {navigation} 
									id = {id}
								/>
							})
							:
							(turmas).map(turma => {
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
									navigation = {navigation} 
									id = {id}
								/>
							}))
						}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}