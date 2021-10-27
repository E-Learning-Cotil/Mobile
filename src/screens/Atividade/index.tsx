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
import { DownloadableFile } from '../../components/DownloadableFile';
import { useNavigation } from '@react-navigation/native';


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

export function Atividade({ route }: any){
	const navigation = useNavigation();
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
							<DownloadableFile/>
						<ScrollView style={styles.content}>
						</ScrollView>
			</View>
		);
	}
	else
	{
		return(
			<View style={[styles.container]}>
				<NavBar color={theme.colors.highlight}/>
				<ScrollView style={styles.content}  scrollEnabled={false}>
				
				<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={Dimensions.get('window').width - 40}
				height={1000}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="0" y="12" rx="6" ry="6" width="50%" height="22" />
				<Rect x="0" y="38" rx="6" ry="6" width="40%" height="14" />
				<Rect x="0" y="66" rx="6" ry="6" width="100%" height="20" />
				<Rect x="0" y="90" rx="6" ry="6" width="100%" height="20" />
				<Rect x="0" y="114" rx="6" ry="6" width="100%" height="20" />
				<Rect x="0" y="138" rx="6" ry="6" width="100%" height="20" />
				<Rect x="0" y="162" rx="6" ry="6" width="100%" height="20" />
				<Rect x="0" y="198" rx="6" ry="6" width="30%" height="22" />
				</ContentLoader>

				</ScrollView>
			</View>
		);
	}			
}
