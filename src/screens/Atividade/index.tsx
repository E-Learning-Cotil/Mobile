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
import { CardTopico } from '../../components/CardTopico';


interface DadosAtividade {
	nome: string;
	dataFim: string;
	arquivosAtividades: [
		{
			id: number;
			idArquivoProfessor: number;
			idAtividade: number;
		}
	];	
	topico: {
		turma: {
			nome: string;
			icone: {
				altLink: string;
			}
			cores: {
				corPrim: string;
			}
		}
	}
}

export function Atividade({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dadosAtividade, setDadosAtividade ] = useState<DadosAtividade>();
	
	useEffect(() => {		
		async function getDadosAtividade() {
			const {
				data,	
				status
			} = await api.get(`/atividades/${id}`);

			setDadosAtividade(data);
		}

		async function load(){
			await getDadosAtividade();
			setLoading(false);
		}

		setLoading(true);
		load();
	}, [id]);

	if(!loading){
		return( 
			<View style={[styles.container]}>
						<NavBar 
						title={ dadosAtividade?.nome } 
						
						iconName={ dadosAtividade?.topico.turma.icone.altLink }
							color={ dadosAtividade?.topico.turma.cores.corPrim }
						/>

						<ScrollView style={styles.content}>
							<View style={styles.topicosList}>
								
							</View>
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
				{
					[...Array(6)].map((value, index) => {
						return <CardTopico 
							key={ index } 
							loading={true} 
							navigation = {navigation} 
						/>
					})
				}
				</ScrollView>
			</View>
		);
	}			
}
