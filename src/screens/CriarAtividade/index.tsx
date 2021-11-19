import React, { useEffect, useState } from 'react';

import { 
	View,
	ScrollView,
	Text,
	Dimensions,
	Modal,
	Platform,
	Alert,
	TextInput,
	Pressable,
	ActivityIndicator,
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
	dataInicio: string;
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
}

interface File {

	name: string;
	link: string;

}

export function CriarAtividade({ route, navigation }: any){
	const { update, atividade } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [ creating, setCreating ] = useState(false);
	const [ newTopicTitle, setNewTopicTitle ] = useState('');
	const [ newTopicDescription, setNewTopicDescription ] = useState('');
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dadosAtividade, setDadosAtividade ] = useState<DadosAtividade>();
	
	const [files, setFiles] = useState<File[]>([]);

    const [sended, setSended] = useState(false);
    const [isSending, setIsSending] = useState(false);

	function removeAnnexedFile(index: number) {
		var array = files
		array.splice((index),1)

		setFiles(array);
	}

	async function updateActivity() {
		setIsSending(true);

		
		try {
            
        } catch (error) {
			Alert.alert(
				update ? "Erro ao atualizar a atividade" : "Erro ao criar a atividade.",
				`Tente novamente`,
				[
				  { text: "OK", onPress: () => console.log("OK Pressed") }
				]
			  );
        }
        

        setIsSending(false);
	}

	useEffect(() => {
		setDadosAtividade(atividade);
		if(atividade?.arquivosAtividades)
		{	
			setFiles(atividade?.arquivosAtividades)
		}
		else
		{
			setFiles([])
		}
	},[atividade]);

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

				setFiles(prevState => ([...prevState, {
					link: uploadedFile.link,
					name: uploadedFile.name,
				}]));
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
		

		async function load(){
			
			setLoading(false);
		}

		
		setLoading(true);
		load();

	});

	if(!loading){
		return( 
			<View style={[styles.container]}>
				<NavBar 
				title={ dadosAtividade?.topico.turma.nome } 
				
				iconName={ dadosAtividade?.topico.turma.icone.altLink }
					color={ dadosAtividade?.topico.turma.cores.corPrim }
				/>

				
				<ScrollView style={styles.content}>
					<View style={{marginBottom: 200}}>
					<Text style={[styles.text, styles.title]}>
								Titulo da atividade:
							</Text>
							<TextInput
								style={styles.createActivityTextInput}
								onChangeText={setNewTopicTitle}
								value={newTopicTitle}
								placeholder={'(Obrigatório)'}
								placeholderTextColor={theme.colors.gray70}
							/>

							<Text style={[styles.text, styles.title]}>
								Data Inicio:
							</Text>

							<Text style={[styles.text, styles.title]}>
								Data Fim:
							</Text>

							<Text style={[styles.text, styles.title]}>
								Descrição:
							</Text>
							<TextInput
								style={{...styles.createActivityTextInput, ...{ height: 90 }}}
								onChangeText={setNewTopicDescription}
								value={newTopicDescription}
								multiline={true}
								placeholder={'(Obrigatório)'}
								placeholderTextColor={theme.colors.gray70}
							/>

							<Text style={[styles.text, styles.title]}>
								Anexos:
							</Text>

							{
								files.map((file, index) => {
									return <View style={[styles.buttonAnnex, {flexDirection: 'row'}]} key={index}>
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
											removeAnnexedFile(index)
										}}
										>
											<FontAwesome5 name={"window-close"} size={24} color="white" />
										</RectButton>
									</View>
								})

							}	

							<RectButton 
								style={[styles.buttonAddFile, { backgroundColor: dadosAtividade?.topico.turma.cores.corPrim  }]}
								onPress={() => {
									annexFile()
								}}
							>
								<Text style={[styles.text, styles.title]}> Adicionar arquivo </Text>
							</RectButton>
					</View>

							
				</ScrollView>
			<View>
				
			</View>
				<View
				 style={styles.buttonView}
				 >
				<RectButton
					style={[styles.confirmEditButton, { backgroundColor: dadosAtividade?.topico.turma.cores.corPrim  }]}
					onPress={ () => {} }
				>
					
					{
						creating ?
							<ActivityIndicator
								size="large"
								color="#fff"
								animating={true}
							/> 
						:
							<Text style={[styles.text, styles.title]}>
								{update ? "Atualizar" : "Criar"}
							</Text>
					}
					<FontAwesome5 name="pencil-alt" size={24} color="white" />
				</RectButton>
				</View>
				
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