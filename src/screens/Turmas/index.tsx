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

interface Turma {
	id: number;
	nome: string;
  serie: {
    ano: string;
    sigla: string;
  }
	cores: {
		corPrim: string;
	};
	icone: {
		link: string;
	};
}

export function Turmas(){
	const { user } = useAuth();
	const color = user?.role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90

	const [ loading, setLoading ] = useState(true);

	const [ turmas, setTurmas ] = useState<Turma[]>([]);

	useEffect(() => {
		async function getTurmas() {
			const {
				data,
				status
			} = await api.get('/turmas/list-by-role');

			setTurmas(data);
			setLoading(false);
		}

		getTurmas();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Turmas" iconName="book"
				color={color}
			/>

			<ScrollView style={styles.content}>
				
				<View style={styles.turmas}>
					<LabelText title="Turmas" color={color}/>
          <ActivityIndicator color="#fff" size='large' animating={loading} style={ !loading && { display: 'none' } } />
					<View style={styles.turmasList}>
						{
							turmas.map(turma => {
								const key = turma.id;
								const title = turma.nome;
								const subtitle = user?.role === 'ALUNO' ? null : "";
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