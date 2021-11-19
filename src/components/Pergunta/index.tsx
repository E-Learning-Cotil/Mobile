import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {  } from '../../utils/moment';

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
}

export function Pergunta ({ pergunta, idAlternative, setResult, color }: Props) {
	const [ checked, setChecked ] = useState<number>();

	const desiredWidth = Dimensions.get('window').width - 60;
	const [desiredHeight, setDesiredHeight] = React.useState(0)

	if(pergunta.imagem)
		Image.getSize(pergunta.imagem, (width, height) => {
			setDesiredHeight(desiredWidth  / width * height)
		});

	useEffect(() => {
		if (checked !== undefined)
			setResult(idAlternative, checked === pergunta.certo);
	}, [checked]);

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
					/>

					<Text style={styles.alternativeText}>
						{ alternativa.texto }
					</Text>
				</View>)
			}
		</View>
	);
};