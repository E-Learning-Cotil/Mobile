import React, { useEffect, useState } from 'react';

import { 
	View,
	ScrollView,
	Text,
	Dimensions,
} from 'react-native';

import ContentLoader, { Rect } from "react-content-loader/native"
import { useNavigation } from '@react-navigation/native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';
import { CardTopico } from '../../components/CardTopico';
import { DownloadableFile } from '../../components/DownloadableFile';

import { useAuth } from '../../contexts/auth';
import { getStyledDate, getDatetimeColor } from '../../utils/moment';
import api from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';



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
						title={ dadosAtividade?.topico.turma.nome } 
						
						iconName={ dadosAtividade?.topico.turma.icone.altLink }
							color={ dadosAtividade?.topico.turma.cores.corPrim }
						/>
						<ScrollView style={styles.content}>
							<Text style={[styles.title, styles.text]}>
								{dadosAtividade?.nome}
							</Text>

							<Text style={[styles.title, styles.text]}>
								Data de entrega: {dadosAtividade && getStyledDate(dadosAtividade.dataFim)}
							</Text>

							<Text style={[styles.title, styles.text]}>
								{}
							</Text>

							<Text style={[styles.title, styles.text]}>
								Passa zap gata 😍
							</Text>
							<DownloadableFile
								color={dadosAtividade?.topico.turma.cores.corPrim}
								url={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
							/>

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
