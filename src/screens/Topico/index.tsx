import React, { useEffect, useState } from 'react';

import { View, ScrollView, Text, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import { NavBar } from '../../components/NavBar';
import { CarouselPagination } from '../../components/CarouselPagination';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';
import { CardMaterialAtividadeTeste } from '../../components/CardMaterialAtividadeTeste';
import ContentLoader, { Rect } from "react-content-loader/native"

interface DadosConteudo{
	id: number;
	nome: string;
}

interface DadosTopico {
	nome: string;
	descricao: string;
	turma: {
		nome: string;
		cores: {
			corPrim: string;
			corSec: string;
		};
		icone: {
			altLink: string;
		};
	};
	Materiais: DadosConteudo[];
	atividades: DadosConteudo[];
	testes: DadosConteudo[];
	
}

export function Topico({ route, navigation }: any){
	const { id } = route.params;
	const { user } = useAuth();
	const role = user?.role;
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dados, setDados ] = useState<DadosTopico>();
	const [ matrizDados, setMatrizDados ] = useState<DadosTopico[][]>([ [], [], [] ]);
	const [ activeIndex, setActiveIndex ] = useState(1);
	
	useEffect(() => {		
		async function getDados() {
			try{
				setMatrizDados([ [], [], [] ]);

				const {
					data,	
					status
				} = await api.get(`/topicos/${id}`);
				
				setDados(data);

				setMatrizDados(matrizDados.map((value, index) => {
					if (index === 0) return data.Materiais;
					else if (index === 1) return data.atividades;
					else if (index === 2) return data.testes;
				}));
				
			} catch (error: any) {
				console.log('Error Topico: ', error.response.data.error);
			}			
		}

		async function load(){
			await getDados();

			setLoading(false);
			setActiveIndex(1);
		}

		setLoading(true);
		load();
	}, [id]);

	function scrollView({ item, index }: any) {
		const message = ['Nenhum Material', 'Nenhuma Atividade', 'Nenhum Teste'];
		
		if (item.length !== 0)
		return (
			<ScrollView style={styles.scrollView}>
				<View style={styles.scrollViewContent}>
				{
					index === 0 ?
					item.map((material: any, index: number) => {
						const title = material.nome;
						
						const id = material.id;

						const cor = index % 2;

						return <CardMaterialAtividadeTeste 
							key={id}
							type={1}
							title={title} 
							color={ cor == 0? dados?.turma.cores.corPrim : dados?.turma.cores.corSec }
							id = {id}
						/>
					})
					:
					index === 1 ?
					item.map((atividade: any, index: number) => {
						const title = atividade.nome;
						
						const id = atividade.id;		
						const cor = index % 2;

						return <CardMaterialAtividadeTeste 
							key={id}
							type={2}
							title={title} 
							color={cor == 0? dados?.turma.cores.corPrim : dados?.turma.cores.corSec} 
							id = {id}
						/>
					})
					:
					index === 2 &&
					item.map((teste: any, index: number) => {
						const title = teste.nome;
						
						const id = teste.id;
						const cor = index % 2;

						return <CardMaterialAtividadeTeste 
							key={id}
							type={3}
							title={title} 
							color={cor == 0? dados?.turma.cores.corPrim : dados?.turma.cores.corSec} 
							id = {id}
						/>
					})
				}
				</View>
			</ScrollView>
		);
		else
		return(
			<View style={{ minHeight: '100%' }}>
				<Text style={[styles.text, { textAlign: 'center' }]}>
					{ message[index] }
				</Text>
			</View>
		);
	}

	if(!loading && dados){
		return( 
			<View style={[styles.container]}>
				<NavBar 
					title={ dados?.turma.nome } 
					iconName={ dados?.turma.icone.altLink }
					color={ dados?.turma.cores.corPrim }
				/>
				<View style={styles.content}>

					<Text 
						style={[styles.title, styles.text]}
						numberOfLines={1}
					>
						{dados?.nome}
					</Text>

					<Text 
						style={[styles.description, styles.text]}
						numberOfLines={4}
					>
						{dados?.descricao}
					</Text>

					<CarouselPagination
						length={3}
						activeIndex={activeIndex}
						corPrim={dados.turma.cores.corPrim}
					/>

					<Carousel
						style={styles.carousel}
						data={matrizDados}
						renderItem={scrollView}
						itemWidth={(Dimensions.get('window').width - 40)}
						sliderWidth={(Dimensions.get('window').width - 40)}
						firstItem={1}
						onSnapToItem={index => setActiveIndex(index) }
					/>

				</View>
			</View>
		);
	}
	else
	{
		return (
		<View  style={[styles.container]}>
			<NavBar color={theme.colors.highlight}/>

			<ContentLoader
				style={styles.skeleton}
				speed={1}
				width={Dimensions.get('window').width - 40}
				height={140}
				backgroundColor={theme.colors.gray80}
				foregroundColor={theme.colors.gray70}
			>
				<Rect x="0" y="12" rx="6" ry="6" width="70%" height="22" />
				<Rect x="0" y="46" rx="6" ry="6" width="100%" height="22" />
				<Rect x="0" y="72" rx="6" ry="6" width="100%" height="22" />
				<Rect x="8%" y="120" rx="7.5" ry="7.5" width="22%" height="15" />
				<Rect x="35%" y="117.5" rx="12.5" ry="12.5" width="30%" height="20" />
				<Rect x="70%" y="120" rx="7.5" ry="7.5" width="22%" height="15" />
			</ContentLoader>
			<ScrollView style={styles.content} scrollEnabled={false}>

				{
					[...Array(6)].map((value, index) => {
						return <CardMaterialAtividadeTeste 
							key={index} 
							loading={true} 
							id = {index}
						/>
					})
				}
			</ScrollView>				
		</View>
		);}
}
