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


interface DadosTurma {
	nome: string;
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}

export function Turma({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dados, setDados ] = useState<DadosTurma>();
	
	useEffect(() => {
		async function getDados() {
			const {
				data,
				status
			} = await api.get(`/turmas/${id}`);

			setDados(data);
			setLoading(false);
		}
		
		getDados();
	}, [id]);
	
	const color = dados?.cores.corPrim;

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Turmas" 
				
				iconName={dados?.icone.altLink}
				color={color}
				
			/>

			<ScrollView style={styles.content}>
				
			</ScrollView>
		</View>
	);
}