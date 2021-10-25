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


interface DadosTurma {
	nome: string;
	cores: {
		corPrim: string;
	};
	icone: {
		altLink: string;
	};
}
interface Topicos {
	id: number;
	nome: string;
	descricao: string;
}

export function Turma({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dados, setDados ] = useState<DadosTurma>();
	const [topicos, setTopicos] = useState<Topicos[]>([]);
	
	useEffect(() => {		
		async function getDados() {
			try{
				const {
					data,	
					status
				} = await api.get(`/turmas/${id}`);
				setDados(data);
			} catch (error: any) {
				console.log('Error Turma: ', error.response.data.error);
			}	
			
		}

		async function getTopicos() {
			try{
				const {
					data,	
					status
				} = await api.get(`/topicos/?idTurma=${id}`);

				setTopicos(data);
			} catch (error: any) {
				console.log('Error Turma: ', error.response.data.error);
			}	
		}

		async function load(){
			await getDados();
			await getTopicos();
			setLoading(false);
		}
		setLoading(true);
		load();
	}, [id]);

	if(!loading){
		return( 
			<View style={[styles.container]}>
					<NavBar 
						title={ dados?.nome } 
						
						iconName={ dados?.icone.altLink }
							color={ dados?.cores.corPrim }
						/>

						<ScrollView style={styles.content}>
							<View style={styles.topicosList}>
								{
									(topicos).map(topico => {
										const id = topico.id;
										const title = topico.nome;
										const descricao = topico.descricao;
		
										return <CardTopico 
											key={ id } 
											id={ id }
											title={ title } 
											description={ descricao } 
											navigation = { navigation } 
										/>
									})
								}
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
				<ScrollView style={styles.content} scrollEnabled={false}>
				{
					[...Array(6)].map((value, index) => {
						return <CardTopico 
							key={index} 
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
