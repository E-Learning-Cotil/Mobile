import React, { useEffect, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { DropdownAtividade } from '../../components/DropdownAtividade';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

interface Atividade {
	id: number;
	nome: string;
	dataFim: string;
	topico: {
		nome: string;

		turma: {
			nome: string;
		}
	}
}

export function Atividades(){
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const [ loading, setLoading ] = useState(true);
	const [ atividades, setAtividades ] = useState<Atividade[]>([]);

	useEffect(() => {
		async function getAtividades() {
			const {
				data,
				status
			} = await api.get('/atividades');

			setAtividades(data);

			setLoading(false);
		}

		getAtividades();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Atividades" iconName="list"
				color={color}
			/>

			<ScrollView style={styles.content}>
				{
					!loading
					?
					atividades.map(atividade => {
						const id = atividade.id;
						const title = atividade.topico.turma.nome;
						const deadline = atividade.dataFim;
						const description = `${atividade.topico.nome} - ${atividade.nome}`;

						return <DropdownAtividade key={id} id={id} title={title} deadline={deadline} description={description} loading={false} />
					})
					:
					[...Array(6)].map((value, index) => {
						return <DropdownAtividade key={index} loading={true} />
					})
				}
				<View style={{height: 50}}>{/*ISTO N É GAMBIARRA*/}</View>
			</ScrollView>
		</View>
	);
}