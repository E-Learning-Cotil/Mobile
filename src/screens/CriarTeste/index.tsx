import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

import { NavBar } from '../../components/NavBar';
import { Pergunta } from '../../components/Pergunta';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { getFormattedDatetime, getDatetimeColor, showTimePassed } from '../../utils/moment';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function CriarTeste({ route, navigation }: any) {
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;

	const [ loading, setLoading ] = useState(false);
	const [ submiting, setSubmiting ] = useState(false);

	useEffect(() => {
	}, [id]);

	if (!loading) {

		return (
			<View style={[styles.container]}>
				{/* <NavBar
					title={dadosTeste?.nome}
					iconName={dadosTeste?.topicos.turma.icone.altLink}
					color={dadosTeste?.topicos.turma.cores.corPrim}
				/> */}

				<ScrollView style={styles.content} >
					
				</ScrollView>
			</View>
		);
	}
	else {
		return (
			<View style={[styles.container]}>
				<NavBar color={theme.colors.highlight} />
				<ScrollView style={styles.content} scrollEnabled={false}>
					<ContentLoader
						style={styles.skeleton}
						speed={1}
						width={'100%'}
						height={65}
						backgroundColor={theme.colors.gray80}
						foregroundColor={theme.colors.gray70}
					>
						<Rect x="20%" y="5" rx="6" ry="6" width="60%" height="18" />
						<Rect x="15%" y="28" rx="6" ry="6" width="70%" height="16" />
						<Rect x="10%" y="48" rx="6" ry="6" width="80%" height="16" />
					</ContentLoader>
				</ScrollView>
			</View>
		);
	}
}
