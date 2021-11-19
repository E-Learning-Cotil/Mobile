import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import api from "../../../services/api";

import { theme } from '../../../global/styles/theme';
import { styles } from './styles';

interface Pergunta {
	pergunta: string;
	imagem: string | null;
	certo: number;
	alternativas: {
		texto: string;
	}[];
}

interface Props {
	pergunta: Pergunta;
	perguntaIndex: number;
	onPerguntaChange( pergunta: Pergunta, index: number ): void;
	color: string;
}

export function PerguntaBuilder ({ pergunta, perguntaIndex, onPerguntaChange, color }: Props) {
	const [ checked, setChecked ] = useState<number>(pergunta.certo);

	const desiredWidth = Dimensions.get('window').width - 60;
	const [desiredHeight, setDesiredHeight] = React.useState(0)

	const [ maxOptions, setMaxOptions ] = useState(false);

	async function handleChoosePhoto () {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});

		if (result.cancelled === false) {
			const fileUri = result.uri;
			const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
			const fileExtension = fileName.split('.').pop();

			let formData = new FormData();
			formData.append('file', {
				uri: fileUri,
				name: fileName,
				type: `image/${fileExtension}`
			} as any);

			try {
				const {
					data: { link },
					status
				} = await api.post('/arquivos', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						'basic_token': process.env.BASIC_TOKEN,
					},
				});

				onPerguntaChange({...pergunta, imagem: link}, perguntaIndex);
			} catch (error) {
				console.log(error)
			}
		}
	}

	function addOptionHandler() {
		if (pergunta.alternativas.length === 4)
			setMaxOptions(true);
		onPerguntaChange({...pergunta, alternativas: [...pergunta.alternativas, { texto: '' }]}, perguntaIndex);
	}

	useEffect(() => {
		onPerguntaChange({...pergunta, certo: checked}, perguntaIndex);
	}, [checked]);

	useEffect(() => {
		if(pergunta.imagem)
			Image.getSize(pergunta.imagem, (width, height) => {
				setDesiredHeight(desiredWidth  / width * height)
			});
	}, [pergunta.imagem]);

	return (
		<View style={styles.container}>
			<TextInput
				value={pergunta.pergunta}
				onChangeText={text => onPerguntaChange({...pergunta, pergunta: text}, perguntaIndex)}
				multiline={true}
				style={styles.title}
				placeholder={'Pergunta'}
				placeholderTextColor={`${theme.colors.white}66`}
			/>

			{
				pergunta.imagem !== null ?
				<TouchableOpacity
					style={styles.changeImageButton}
					onPress={handleChoosePhoto}
				>
					<Image
						source={{ uri: pergunta.imagem }}
						style={[styles.image, { width: desiredWidth, height: desiredHeight }]}
					/>
					<View style={styles.avatarPickerView}>
						<Text style={styles.avatarPickerText}>
							Alterar
						</Text>
					</View>
				</TouchableOpacity>
				:
				<TouchableOpacity
					style={[styles.changeImageButton, { height: 40 }]}
					onPress={handleChoosePhoto}
				>
					<View style={styles.avatarPickerView}>
						<Text style={[styles.avatarPickerText, { fontSize: 16, lineHeight: 18 }]}>
							Escolha uma Imagem (Opcional)
						</Text>
					</View>
				</TouchableOpacity>
			}

			{
				pergunta.alternativas.map((alternativa, index) => <View key={index} style={styles.alternative}>
					<RadioButton
						value={( index ).toString()}
						status={ checked === index ? 'checked' : 'unchecked' }
						onPress={() => setChecked( index )}
						uncheckedColor={theme.colors.white}
						color={color}
					/>

					<TextInput
						value={alternativa.texto}
						onChangeText={text => onPerguntaChange({
							...pergunta,
							alternativas: pergunta.alternativas.map((alternativa, indexAlternativa) => {
								if (index === indexAlternativa)
									return { texto: text };
								else
									return alternativa
							})
						}, perguntaIndex)}
						style={styles.alternativeText}
						placeholder={'Alternativa'}
						placeholderTextColor={`${theme.colors.white}66`}
					/>
				</View>)
			}

			{
				!maxOptions &&
				<TouchableOpacity
					style={[styles.addOptionButton, { backgroundColor: color }]}
					onPress={ addOptionHandler }
				>
					<Text style={[styles.addOptionButtonText, { marginLeft: 10 }]}>
						Nova Pergunta
					</Text>
				</TouchableOpacity>
			}
		</View>
	);
};