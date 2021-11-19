import React, { useEffect, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { NavBar } from '../../components/NavBar';
import { DropdownAtividade } from '../../components/DropdownAtividade';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

interface Topicos {
	nome: string;
	turma: {
		nome: string;
	}
}

interface Atividade {
	id: number;
	nome: string;
	dataFim: string;
	topicos: Topicos;
	topico: Topicos;
	tipo: 'ATIVIDADE' | 'TESTE';
}

export function Atividades({ navigation }: any){
	const { user } = useAuth();
	const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

	const [ loading, setLoading ] = useState(true);
	const [ atividades, setAtividades ] = useState<Atividade[]>([]);

	async function getAtividades() {
		try {
			const {
				data,
				status
			} = await api.get('/atividades/list-by-role');

			setAtividades(data);

			setLoading(false);
		} catch (error: any) {
			console.log('Error Atividades: ', error.response.data.error);
		}
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
			getAtividades();
		});
	}, []);

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Atividades" iconName="list"
				color={color}
			/>

			<ScrollView style={styles.content} scrollEnabled={!loading}>
				<View style={styles.atividades}>
					{
						!loading
						?
						atividades.map((atividade, index) => {
							const id = atividade.id;
							const deadline = atividade.dataFim;
							const tipo = atividade.tipo;
							const title = tipo === 'ATIVIDADE' ? atividade.topico.turma.nome : atividade.topicos.turma.nome;
							const description = `${tipo === 'ATIVIDADE' ? atividade.topico.nome : atividade.topicos.nome} - ${atividade.nome}`;

							return <DropdownAtividade key={index} id={id} title={title} deadline={deadline} description={description} loading={false} tipo={tipo} />
						})
						:
						[...Array(12)].map((value, index) => {
							return <DropdownAtividade key={index} loading={true} />
						})
					}
				</View>
			</ScrollView>
		</View>
	);
}