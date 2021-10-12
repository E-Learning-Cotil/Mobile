import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text } from 'react-native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';
import { CardMaterialAtividadeTeste } from '../../components/CardMaterialAtividadeTeste';

interface DadosConteudo{
	id: number;
	nome: string;
}

interface DadosTopico {
	nome: string;
	descricao: string;
	turma: {
		nome: string;
		cores: {
			corPrim: string;
		};
		icone: {
			altLink: string;
		};
	};
	materiais: DadosConteudo[];
	atividades: DadosConteudo[];
	testes: DadosConteudo[];
	
}

export function Topico({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dados, setDados ] = useState<DadosTopico>();

	
	
	useEffect(() => {		
		async function getDados() {
			try{
				const {
					data,	
					status
				} = await api.get(`/topicos/${id}`);

				
				setDados(data);
			} catch (error: any) {
				console.log('Error Topico: ', error.response.data.error);
			}	
			
		}

		/*async function getTopicos() {
			try{
				const {
					data,	
					status
				} = await api.get(`/topicos/?idTurma=${id}`);

				setTopicos(data);
			} catch (error: any) {
				console.log('Error Turma: ', error.response.data.error);
			}	
		}*/

		async function load(){
			await getDados();
			/*await getTopicos();*/
			setLoading(false);
		}
		setLoading(true);
		load();
	}, [id]);
			


	if(!loading){
		return( 
			<View style={[styles.container]}>
					<NavBar 
						title={ dados?.turma.nome } 
						
						iconName={ dados?.turma.icone.altLink }
							color={ dados?.turma.cores.corPrim }
						/>

						<ScrollView style={styles.content}>
							<CardMaterialAtividadeTeste navigation={navigation} loading={true} />
						</ScrollView>
			</View>
		);
	}
	else
	{
		return(
			<View style={[styles.container]}>
				<NavBar color={theme.colors.highlight}/>
				<ScrollView style={styles.content}>
				
				</ScrollView>
			</View>
		);
	}		
}
