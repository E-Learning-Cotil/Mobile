import React, { useEffect, useState } from 'react';

import { 
	View,
	ScrollView,
	Text,
	Dimensions,
	Modal,
} from 'react-native';

import ContentLoader, { Rect } from "react-content-loader/native"
import { useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { RectButton } from "react-native-gesture-handler";

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';
import { CardTopico } from '../../components/CardTopico';
import { DownloadableFile } from '../../components/DownloadableFile';

import * as DocumentPicker from 'expo-document-picker';

import { useAuth } from '../../contexts/auth';
import { getStyledDate, getDatetimeColor } from '../../utils/moment';
import api from '../../services/api';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';



interface DadosAtividade {
	nome: string;
	conteudo: string;
	dataFim: string;
	arquivosAtividades: [
		{
			id: number;
			arquivoProfessor: {
				link: string;
				nome: string;
			}
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
	atividadesAlunos: [
		{
			dataEnvio: string;
			link: string;
			nome: string;
			nota: string;
			raAluno: number;
		}
	]
}

export function Atividade({ route }: any){
	const navigation = useNavigation();
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [haveAnAnnex, sethaveAnAnnex] = useState(true);
	const [showModal, setShowModal] = useState(false);
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dadosAtividade, setDadosAtividade ] = useState<DadosAtividade>();

	const [file, setFile] = useState(null);
    const [sended, setSended] = useState(false);
    const [isSending, setIsSending] = useState(false);

	

	function visualizeSendingFile() {

	}

	function removeSendingFile() {
		sethaveAnAnnex(false);
	}

	function addSendingFile() {
		sethaveAnAnnex(true);
	}

	function sendFile() {
		setShowModal(true);
	}

	async function uploadFile () {

		let response = await DocumentPicker.getDocumentAsync({});

		if(response.type !== 'cancel')
		{
			const fileUri = response.uri;
			const fileName = response.name;
			let fileUriSubstring = fileUri.substring(fileUri.lastIndexOf('/') + 1);
			const fileExtension = fileUriSubstring.split('.').pop();

			let formData = new FormData();
			formData.append('file', {
				uri: fileUri,
				name: fileName,
				type: `${fileExtension}`
			} as any);

			const {data: uploadedFile} = await api.post('/arquivos', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'basic_token': process.env.BASIC_TOKEN
				}
			})

			setFile({
				link: uploadedFile.link,
				name: uploadedFile.name,
				data: new Date().toISOString(),
				nota: null
			});
		}
	}


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

			if(dadosAtividade?.atividadesAlunos) {
				const { atividadesAlunos: [sendedFile] } = dadosAtividade;
	
	
				if(sendedFile) {
					setFile({
						name: sendedFile.nome,
						link: sendedFile.link,
						data: sendedFile.dataEnvio,
						nota: sendedFile.nota
					})
					setSended(true);
				}
			}

			setLoading(false);
		}

		/*const formData = new FormData();
        
                formData.append('file', acceptedFiles[0]);
        
                const {data: uploadedFile} = await api.post('/arquivos', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'basic_token': process.env.NEXT_PUBLIC_BASIC_TOKEN
                    }
                })

                setFile({
                    link: uploadedFile.link,
                    name: uploadedFile.name,
                    data: new Date().toISOString(),
                    nota: null
                }); */

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
							<Text style={[styles.title, styles.text, {marginTop: 10}]}>
								{dadosAtividade?.nome}
							</Text>

							<Text style={[styles.subtitle, styles.text]}>
								<Text>Data de entrega: </Text> 
								<Text style={{color: (dadosAtividade?.atividadesAlunos  && dadosAtividade?.atividadesAlunos.length <= 0 && role == "ALUNO") ? getDatetimeColor(dadosAtividade?.dataFim) : theme.colors.white}}>{dadosAtividade && getStyledDate(dadosAtividade.dataFim)}</Text>
								
							</Text>

							<Text style={[styles.description, styles.text, {marginTop: 10}]}>
								{dadosAtividade?.conteudo}
							</Text>

							{
							
								(dadosAtividade?.arquivosAtividades && dadosAtividade?.arquivosAtividades.length > 0) &&
								<Text style={[styles.title, styles.text, {marginTop: 10}]}>
									Anexos: 
								</Text>
							
							}

							{
								dadosAtividade?.arquivosAtividades.map((arquivo, index) => {

									return <DownloadableFile 
										key={index}
										name={arquivo.arquivoProfessor.nome}
										url={arquivo.arquivoProfessor.link}
										color={ dadosAtividade?.topico.turma.cores.corPrim }
									/>
								})
							}			

						</ScrollView>

						<View style={styles.bottomContainer}> 
							<Text style={[styles.subtitle, styles.text]}>
								 Arquivos Anexados: 
							</Text>

						{
							haveAnAnnex ? 
							<View 
								style={styles.buttonAnnex} 
							>
								<View style={styles.row}>
									<View style={styles.contentDiv}>
										<FontAwesome5 name={"file"} size={24} color="black" />	
										<Text 
										style={{
											paddingLeft: 12,
											paddingRight: 24,
											fontFamily:theme.fonts.title400,
											color: theme.colors.background,
											fontSize: 18,
										}} 
										numberOfLines={1}
										>
											aaaaaaaaaaaaaaa
										</Text> 	
									</View>		

									<RectButton 
									style={[styles.iconDiv, {backgroundColor: dadosAtividade?.topico.turma.cores.corPrim}]}
									onPress={() => {
										removeSendingFile()
									}}
									>
										<FontAwesome5 name={"window-close"} size={24} color="white" />
									</RectButton>
								</View>
							
							</View>
							:
							<RectButton 
								style={[styles.buttonAddFile]}
								onPress={() => {
									addSendingFile()
								}}
							>
								<Text style={[styles.text, styles.title]}> Adicionar arquivo </Text>
							</RectButton>
						}
							<RectButton 
								style={[styles.row, styles.buttonSend, {backgroundColor: dadosAtividade?.topico.turma.cores.corPrim}]}
								onPress={() => { sendFile() }}
							>
								<Text style={[styles.text, styles.title]}> Enviar Atividade </Text>
								<View>
										<FontAwesome5 name={"telegram-plane"} size={32} color="white" />
									</View>

							</RectButton>
						</View>

						<Modal transparent={true} visible={showModal} onRequestClose={() => {
							setShowModal(false);
						}}>
							<View style={[styles.modal, {backgroundColor: theme.colors.transparentBlack}]}> 
								<View style={styles.modalDiv}>

									<View 
										style={[styles.buttonAnnex, {justifyContent: 'center',}]} 
									>
										<View style={styles.row}>
											<View style={[styles.contentDiv,{width:'100%'}]}>
												<FontAwesome5 name={"file"} size={24} color="black" />	
												<Text 
												style={{
													paddingLeft: 12,
													paddingRight: 24,
													fontFamily:theme.fonts.title400,
													color: theme.colors.background,
													fontSize: 18,
												}} 
												numberOfLines={1}
												>
													aaaaaaaaaaaaaaa
												</Text> 	
											</View>		
										</View>
									</View>	
								</View>
							</View>
						</Modal>
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
