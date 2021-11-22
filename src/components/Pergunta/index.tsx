import React, { useState, useEffect, memo } from 'react';
import { Dimensions } from 'react-native';

import { View, Text, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Props {
	pergunta: {
		alternativas: {
			texto: string;
		}[];
		certo: number;
		imagem: string | null;
		pergunta: string;
	};
	idAlternative: number;
	setResult( id: number, correct: boolean ): void;
	color: string;
	showAnswers?: boolean;
}

export function Pergunta ({ pergunta, idAlternative, setResult, color, showAnswers }: Props) {
	const [ checked, setChecked ] = useState<number>();

	const desiredWidth = Dimensions.get('window').width - 60;
	const [desiredHeight, setDesiredHeight] = React.useState(0)
		
	useEffect(() => {
		if (checked !== undefined)
		setResult(idAlternative, checked === pergunta.certo);
	}, [checked]);
		
	useEffect(() => {
		if(pergunta.imagem)
		Image.getSize(pergunta.imagem, (width, height) => {
			setDesiredHeight(desiredWidth  / width * height)
		});

		if (showAnswers) setChecked(pergunta.certo);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{ idAlternative+1 + ') ' + pergunta.pergunta }
			</Text>

			{
				pergunta.imagem !== null ?
				<Image
					source={{ uri: pergunta.imagem }}
					style={[styles.image, { width: desiredWidth, height: desiredHeight }]}
				/>
				:
				null
			}

			{
				pergunta.alternativas.map((alternativa, index) => <View key={index} style={styles.alternative}>
					<RadioButton
						value={( index ).toString()}
						status={ checked === index ? 'checked' : 'unchecked' }
						onPress={() => setChecked( index )}
						uncheckedColor={theme.colors.white}
						color={color}
						disabled={(showAnswers && checked !== index)}
					/>

					<Text style={styles.alternativeText}>
						{ alternativa.texto }
					</Text>
				</View>)
			}
		</View>
	);
};