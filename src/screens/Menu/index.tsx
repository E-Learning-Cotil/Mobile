import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { ActivityView } from '../../components/ActivityView';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

interface Activity {
	dataFim: string;
	nome: string;
}

export function Menu(){
	const { user } = useAuth();
	const color = user?.role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90

	const [ activities, setActivities ] = useState<Activity[]>([]);

	useEffect(() => {
		async function getAtividadesAndTurmas() {
			const {
				data:{
					atividades,
					turmas
				},
				status
			} = await api.get('/pagina-inicial');

			setActivities(atividades);
		}

		getAtividadesAndTurmas();
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Home" iconName="home"
				color={color}
			/>

			<View style={styles.content}>
				<View style={styles.atividades}>
					<LabelText title="Atividades" color={color}/>
					<View style={styles.atividadesList}>
						{
							activities.map(activity => {
								const text = activity.nome;
								const date = activity.dataFim.slice(5, 10);
								const formatedDate = date.split('-')[1] + '/' + date.split('-')[0];



								return <ActivityView color={color} text={text} date={formatedDate} />
							})
						}
					</View>
				</View>

				<View style={styles.turmas}>
					<LabelText title="Turmas" color={color}/>
					<View style={styles.turmasList}>

					</View>
				</View>
			</View>
		</View>
	);
}