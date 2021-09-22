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

import ContentLoader, { Rect } from "react-content-loader/native"

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

export function Conversas(){
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
				title="Conversas" iconName="comment-alt"
				color={color}
			/>

			<ScrollView style={styles.content}>
				
			</ScrollView>
		</View>
	);
}