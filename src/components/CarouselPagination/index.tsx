import React from 'react';

import { View, Text} from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

import { styles } from './styles';

interface Props {
	length: number;
	activeIndex: number;
	corPrim: string;
	corSec: string;
}

export function CarouselPagination ({ length, activeIndex, corPrim, corSec }: Props) {
	const title = ['Materiais', 'Atividades', 'Testes'];

	const customDotElement =
	<View
		style={[ styles.dot , { backgroundColor: corPrim }]}
	>
		<Text style={styles.text} >
			{ title[activeIndex] }
		</Text>
	</View>;

	const customInactiveDotElement = 
	<View 
		style={[ styles.inactiveDot, { backgroundColor: corPrim }]}
	/>;

	return (
		<Pagination
			dotsLength={length}
			activeDotIndex={activeIndex}
			containerStyle={[
				styles.container
			]}

			dotElement={customDotElement}
			inactiveDotElement={customInactiveDotElement}
		/>
	);
}