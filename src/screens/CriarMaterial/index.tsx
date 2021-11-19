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
import { getStyledDate } from '../../utils/moment';


interface DadosMaterial {
	nome: string;
	data: string;
	conteudo: string;
	arquivosMateriais: [
		{
			id: number;
			arquivoProfessor: {
				link: string;
				nome: string;
			}
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

export function Material({ route }: any){
	const navigation = useNavigation();
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
				title={ dadosMaterial?.topico.turma.nome } 
				
				iconName={ dadosMaterial?.topico.turma.icone.altLink }
					color={ dadosMaterial?.topico.turma.cores.corPrim }
				/>

				
				<ScrollView style={styles.content}>
					 <Text style={[styles.title, styles.text, {marginTop: 10}]}>
						{dadosMaterial?.nome}
					</Text>

					<Text style={[styles.subtitle, styles.text]}>
						<Text>Data: {dadosMaterial ? getStyledDate(dadosMaterial.data) : "sem data"}</Text> 
						<Text style={{color: theme.colors.white}}></Text>
						
					</Text>

					<Text style={[styles.description, styles.text, {marginTop: 10}]}>
						{dadosMaterial?.conteudo}
					</Text>
					
					{
					(dadosMaterial?.arquivosMateriais && dadosMaterial?.arquivosMateriais.length > 0) &&
						<Text style={[styles.title, styles.text, {marginTop: 10}]}>
							Anexos: 
						</Text>
						
					}


					{
						dadosMaterial?.arquivosMateriais.map((arquivo, index) => {

							return <DownloadableFile 
								key={index}
								name={arquivo.arquivoProfessor.nome}
								url={arquivo.arquivoProfessor.link}
								color={ dadosMaterial?.topico.turma.cores.corPrim }
							/>
						})
					}			 

					
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
				height={230}
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

				<DownloadableFile 
					name={""}
					url={""}
					loading={true}
				/>


				</ScrollView>
			</View>
		);
	}			
}
