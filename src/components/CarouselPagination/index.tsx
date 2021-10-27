import React, { useEffect, useRef } from 'react';

import { Animated, View, Text } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

import { styles } from './styles';

interface Props {
	length: number;
	activeIndex: number;
	corPrim: string;
}

export function CarouselPagination ({ length, activeIndex, corPrim }: Props) {
	const title = ['Materiais', 'Atividades', 'Testes'];

	const corSec = corPrim + 80;

	const scaleAnim = useRef(new Animated.Value(0.8)).current;

	useEffect(() => {
		scaleAnim.setValue(0.83);

		Animated.spring(
			scaleAnim,
			{
				toValue: 1,
				mass: 1.5,
				velocity: 0.75,
				useNativeDriver: false,
			}
		).start();
	}, [activeIndex]);

	const customDotElement =
	<Animated.View
		style={[ styles.dot, { backgroundColor: corPrim }, { transform: ([{ scale: scaleAnim }]) } ]}
	>
		<Text style={styles.text} >
			{ title[activeIndex] }
		</Text>
	</Animated.View>;

	const customInactiveDotElement = 
	<Animated.View 
		style={[ styles.inactiveDot, { backgroundColor: corSec } ]}
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

			// dotStyle={[
			// 	// styles.dot,
			// 	{ backgroundColor: corPrim }
			// ]}
			// inactiveDotStyle={[
			// 	// styles.inactiveDot,
			// 	{ backgroundColor: corPrim }
			// ]}
		/>
	);
}