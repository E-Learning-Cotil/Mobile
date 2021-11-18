import React, { useEffect, useState } from 'react';

import { 
	View,
	ScrollView,
	Text,
	Dimensions,
	Modal,
	Platform,
	Alert,
	Pressable
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
			id: number;
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

interface File {
	name: string;
	link: string;
	data: string;
	nota: any;
}

export function Atividade({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [showModal, setShowModal] = useState(false);
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dadosAtividade, setDadosAtividade ] = useState<DadosAtividade>();
	
	const [file, setFile] = useState<File | null>(null);
	const [haveAnAnnex, sethaveAnAnnex] = useState(false);

    const [sended, setSended] = useState(false);
    const [isSending, setIsSending] = useState(false);

	function removeAnnexedFile() {
		sethaveAnAnnex(false);
		setFile(null);
	}

	async function sendFile() {
		setIsSending(true);

		const newActivity = {
            link: file?.link,
            nome: file?.name,
            idAtividade: Number(id),
            idTurma: dadosAtividade?.topico.turma.id    
        }

		try {
            const {status, data: { message }} = await api.post('/atividades-aluno', newActivity);

            if(status === 201){
                Alert.alert(
					"Sucesso!",
					`Arquivo enviado com sucesso!`,
					[
					  { text: "OK", onPress: () => console.log("OK Pressed") }
					]
				  );
                setSended(true);
				setShowModal(false);
            }
        } catch (error) {
            Alert.alert(
				"Erro ao enviar o arquivo!",
				`Tente novamente`,
				[
				  { text: "OK", onPress: () => console.log("OK Pressed") }
				]
			  );
        }
        

        setIsSending(false);
	}

	async function annexFile () {
		try {
			let response = await DocumentPicker.getDocumentAsync({});

			

			if(response.type !== 'cancel')
			{
				if (Platform.OS === 'android' && response.uri[0] === '/') {
					response.uri = `file://${response.uri}`;
					response.uri = response.uri.replace(/%/g, '%25');
				  }
				  
				const fileUri = response.uri;
				const fileName = response.name;
				let fileUriSubstring = fileUri.substring(fileUri.lastIndexOf('/') + 1);
				const fileExtension = fileUriSubstring.split('.').pop();

				let formData = new FormData();
				formData.append('file', {
					uri: fileUri,
					name: fileName,
					type: 'multipart/form-data'
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
				sethaveAnAnnex(true);
			}
		} catch (error) {
			Alert.alert(
				"Erro ao anexar arquivo!",
				`Tente novamente`,
				[
				  { text: "OK", onPress: () => console.log("OK Pressed") }
				]
			  );
		}

	}


	useEffect(() => {		
		async function getDadosAtividade() {
			setFile(null);
			sethaveAnAnnex(false);
			setSended(false);

			const {
				data,	
				status
			} = await api.get(`/atividades/${id}`);

			if(data.atividadesAlunos) {
				
				const { atividadesAlunos: [sendedFile] } = data;
			
				if(sendedFile) {
					setFile({
						link: sendedFile.link,
						name: sendedFile.nome,
						data: sendedFile.dataEnvio,
						nota: sendedFile.nota
					})
					sethaveAnAnnex(true);
					setSended(true);
					
				}
					
			}

			setDadosAtividade(data);
		}

		async function load(){
			/**/
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

				<View style={[styles.bottomContainer, sended && {height: 130}]}> 
					<Text style={[styles.subtitle, styles.text]}>
							Arquivos Anexados: 
					</Text>

				{
					sended ?
						file && <DownloadableFile name={file?.name} url={file?.link} color={dadosAtividade?.topico.turma.cores.corPrim}/>
					: 
					haveAnAnnex ? 
						/* Arquivo */
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
										{`${file?.name}`}
									</Text> 	
								</View>		

								<RectButton 
								style={[styles.iconDiv, {backgroundColor: dadosAtividade?.topico.turma.cores.corPrim}]}
								onPress={() => {
									removeAnnexedFile()
								}}
								>
									<FontAwesome5 name={"window-close"} size={24} color="white" />
								</RectButton>
							</View>
						
						</View>
						:
						/* Botão adicionar arquivo */
						<RectButton 
							style={[styles.buttonAddFile]}
							onPress={() => {
								annexFile()
							}}
						>
							<Text style={[styles.text, styles.title]}> Adicionar arquivo </Text>
						</RectButton>
				}
					{/* Botão enviar Atividade */}
					{
						!sended ?
					<RectButton 
						style={[styles.row, styles.buttonSend, {backgroundColor: dadosAtividade?.topico.turma.cores.corPrim}]}
						onPress={() => { haveAnAnnex ? setShowModal(true) : Alert.alert(
							"Voce precisa anexar um arquivo!",
							`Por favor, anexe um arquivo antes de enviar a atividade.`,
							[
							  { text: "OK", onPress: () => console.log("OK Pressed") }
							]
						  ); }}
					>
						<Text style={[styles.text, styles.title]}> Enviar Atividade </Text>
						<View>
								<FontAwesome5 name={"telegram-plane"} size={32} color="white" />
							</View>

					</RectButton>
					:
					<Text style={[styles.subtitle, styles.text,{marginTop: 10}]}>Data de envio: {getStyledDate(file?.data)}</Text>
				}
				</View>

				<Modal transparent={true} visible={showModal} onRequestClose={() => {
					setShowModal(false);
				}}>
					<View style={[styles.modal, {backgroundColor: theme.colors.transparentBlack}]}> 
						<View style={styles.modalDiv}>
							<Text style={[styles.text, styles.subtitle, {paddingTop: 10}]}>
								Confirmar envio da atividade?
							</Text>
			
							{file &&
								<View 
									style={[styles.buttonAnnex, {justifyContent: 'center',}]} 
								>
									<View style={styles.row}>
										<View style={[styles.contentDiv,{width:'90%'}]}>
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
												{`${file?.name}`}
											</Text> 	
										</View>		
									</View>
								</View>	 
							} 
							
							<View style={[styles.row, {marginTop: 20, justifyContent:'space-between'}]}>
								<Pressable 
								style={[
									styles.cancelConfirmButton,
										{backgroundColor: dadosAtividade?.topico.turma.cores.corPrim }
										]}
								onPress={() => {
									setShowModal(false);
								}}
								>
										<Text style={[styles.text, styles.subtitle]}>
											Cancelar
										</Text>
								</Pressable>

								<Pressable 
								style={[
									styles.cancelConfirmButton,
										{backgroundColor: dadosAtividade?.topico.turma.cores.corPrim }
										]}
								onPress={() => {
									sendFile();
								}}
								>
									<Text style={[styles.text, styles.subtitle]}>
										Confirmar
									</Text>
								</Pressable>
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
