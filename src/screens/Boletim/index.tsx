import React, { useEffect, useState } from 'react';
import { Animated, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import ContentLoader, { Rect } from "react-content-loader/native"

import { NavBar } from '../../components/NavBar';

import api from '../../services/api';

import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface TurmaBoletim {
	nome: string;
	mediaAtividades: number;
	mediaTestes: number;
	mediaTurma: number;
}

export function Boletim() {
	const [ loading, setLoading ] = useState(true);

	const [ boletim, setBoletim ] = useState<TurmaBoletim[]>();

	const [ scaleAnimArray, setScaleAnimArray ] = useState<Animated.ValueXY[]>([]);
	const [ dropDownStates, setDropDownStates ] = useState<boolean[]>([]);

	useEffect(() => {
		async function getBoletim () {
			try {
				const {
					data,
					status
				} = await api.get('/boletim');
	
				setScaleAnimArray(await data.map(() => {
					return new Animated.ValueXY({ x: 0, y: 0 });
				}));
	
				setDropDownStates(await data.map(() => false));
	
				setBoletim(data);
				setLoading(false);
			} catch (error: any) {
				console.log('Error Atividades: ', error.response.data.error);
			}
		}

		getBoletim();
	}, []);

	const toggleAnimation = (dropDownIndex: number) => {
		if (dropDownStates[dropDownIndex]) {
			scaleDown(dropDownIndex);
		}
		else {
			scaleUp(dropDownIndex);
		}
	};

	const scaleUp = (dropDownIndex: number) => {
		setDropDownStates(() => dropDownStates.map( ( item, index ) =>  index === dropDownIndex ? !item : item ));
		Animated.timing(scaleAnimArray[dropDownIndex], {
			toValue: { x: 90, y: 5 },
			duration: 500,
			useNativeDriver: false
		}).start();
	};

	const scaleDown = (dropDownIndex: number) => {
		Animated.timing(scaleAnimArray[dropDownIndex], {
			toValue: { x: 0, y: 0 },
			duration: 500,
			useNativeDriver: false
		}).start(() => {
			setDropDownStates(() => dropDownStates.map( ( item, index ) =>  index === dropDownIndex ? !item : item ));
		});
	};

    return (
		<View style={styles.container}>
			<NavBar 
				title="Boletim" iconName="scroll"
				color={theme.colors.green90}
			/>

			<ScrollView style={styles.content} scrollEnabled={!loading}>
				<View style={styles.boletim}>
					{
						!loading
						?
						boletim?.map((turma, index) => {
							const { nome, mediaAtividades, mediaTestes, mediaTurma } = turma;

							return (
								<View key={index} style={styles.tableGroup}>
									<TouchableWithoutFeedback onPress={() => toggleAnimation(index)}>
										<View style={styles.tableHeader}>
											<Text style={styles.headerText}>
												{nome}
											</Text>
											<Text style={[styles.tableText, styles.gradePreview, dropDownStates[index] && {display: 'none'}]}>
													{mediaTurma}
											</Text>
											<FontAwesome5
												name={dropDownStates[index] ? "caret-up" : "caret-down"}
												size={24}
												color={theme.colors.white}
											/>
										</View>
									</TouchableWithoutFeedback>
									<Animated.View
										style={[
											styles.tableBody,
											{ height: scaleAnimArray[index].x },
											{ paddingVertical: scaleAnimArray[index].y },
											!dropDownStates[index] && { display: 'none' }
										]}
									>
										<View style={styles.tableRow}>
											<View style={styles.tableColumnTitle}>
												<Text style={styles.tableText}>
													Atividades:
												</Text>
											</View>
											<View style={styles.tableColumn}>
												<Text style={styles.tableText}>
													{mediaAtividades}
												</Text>
											</View>
										</View>
										<View style={styles.tableRow}>
											<View style={styles.tableColumnTitle}>
												<Text style={styles.tableText}>
													Testes:
												</Text>
											</View>
											<View style={styles.tableColumn}>
												<Text style={styles.tableText}>
													{mediaTestes}
												</Text>
											</View>
										</View>
										<View style={styles.tableRow}>
											<View style={styles.tableColumnTitle}>
												<Text style={styles.tableText}>
													Média final:
												</Text>
											</View>
											<View style={styles.tableColumn}>
												<Text style={styles.tableText}>
													{mediaTurma}
												</Text>
											</View>
										</View>
									</Animated.View>
								</View>
							);
						})
						:
						<ContentLoader
							style={styles.skeleton}
							speed={1}
							width={'100%'}
							height={360}
							backgroundColor={theme.colors.gray80}
							foregroundColor={theme.colors.gray70}
						>
							{
								[...Array(10)].map((value, index) => {
									const y = index * 36 + 6;

									return <Rect key={index} x="10" y={y} rx="2" ry="2" width="95%" height="24" />
								})
							}
							
						</ContentLoader>
					}
				</View>
			</ScrollView>
		</View>
    );
}