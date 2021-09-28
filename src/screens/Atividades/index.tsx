import React, { useEffect, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { DropdownAtividade } from '../../components/DropdownAtividade';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

import ContentLoader, { Rect } from "react-content-loader/native"

export function Atividades(){
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Atividades" iconName="list"
				color={color}
			/>

			<ScrollView style={styles.content}>
				<DropdownAtividade />
			</ScrollView>
		</View>
	);
}