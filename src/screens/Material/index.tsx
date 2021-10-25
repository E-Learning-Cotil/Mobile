import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, Dimensions } from 'react-native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';
import { CardTopico } from '../../components/CardTopico';
import ContentLoader, { Rect } from "react-content-loader/native"


interface DadosMaterial {
	nome: string;
	data: string;
	conteudo: string;
	arquivosMateriais: [
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

export function Material({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dadosMaterial, setDadosMaterial ] = useState<DadosMaterial>();
	
	useEffect(() => {		
		async function getDadosMaterial() {
			const {
				data,	
				status
			} = await api.get(`/materiais/${id}`);

			setDadosMaterial(data);
		}

		async function load(){
			await getDadosMaterial();
			setLoading(false);
		}

		setLoading(true);
		load();
	}, [id]);

	if(!loading){
		return( 
			<View style={[styles.container]}>
						<NavBar 
						title={ dadosMaterial?.nome } 
						
						iconName={ dadosMaterial?.topico.turma.icone.altLink }
							color={ dadosMaterial?.topico.turma.cores.corPrim }
						/>

						<ScrollView style={styles.content}>
							<View style={styles.topicosList}>

								<Text style={[styles.title, styles.text]}>{dadosMaterial?.nome}</Text>

								<Text style={[styles.content, styles.text]}>{dadosMaterial?.conteudo}</Text>
								
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
				 
				
				<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={Dimensions.get('window').width - 40}
				height={1000}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
				>
					<Rect x="0" y="12" rx="6" ry="6" width="70%" height="22" />
					<Rect x="0" y="46" rx="6" ry="6" width="100%" height="20" />
					<Rect x="0" y="70" rx="6" ry="6" width="100%" height="20" />
					<Rect x="0" y="94" rx="6" ry="6" width="100%" height="20" />
					<Rect x="0" y="118" rx="6" ry="6" width="100%" height="20" />
					<Rect x="0" y="142" rx="6" ry="6" width="100%" height="20" />
					<Rect x="0" y="178" rx="6" ry="6" width="30%" height="22" />
				</ContentLoader>

				</ScrollView>
			</View>
		);
	}			
}
