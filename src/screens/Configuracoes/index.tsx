import React, { useEffect, useState } from 'react';

import { View, TextInput, Text, ActivityIndicator, ScrollView } from 'react-native';

import { LabelText } from '../../components/LabelText';
import { NavBar } from '../../components/NavBar';
import { CardAtividade } from '../../components/CardAtividade';
import { CardTurma } from '../../components/CardTurma';

import { useAuth } from '../../contexts/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import api from '../../services/api';

import ContentLoader, { Rect } from "react-content-loader/native"
import { Avatar } from '../../components/Avatar';

interface InfoAluno {
	ra: number;
	nome: string;
	email: string;
  idSerie: number;
}

interface InfoProfessor {
	rg: number;
	nome: string;
	email: string;
}



export function Configuracoes(){
	const { user } = useAuth();

  const [info, setInfo] = useState<InfoAluno | InfoProfessor>();
	
  const role = user?.role;
	const color = role === 'ALUNO' ? theme.colors.green90 : theme.colors.purple90;

  /*useEffect(() => {
		async function getInfo() {
        const {	
          data,
          status 
        } = user?.role === 'Aluno' ? await api.get('/Aluno/' + {user?.id}) : await api.get('/pagina-inicial');
				setInfo(data);	
    }

		getInfo();
	}, []);*/

	return(
		<View style={styles.container}>          
			<NavBar 
				title="Configurações" iconName="cog"
				color={color}
			/>
			<ScrollView style={styles.content}>
        <View style={styles.avatarDiv}>
          <View style={[
              styles.avatarBackground,
              {backgroundColor: color}
            ]}>
              
          </View>
          <Avatar 
              urlImage={user?.foto} 
              imageBorderRadius={{borderRadius: 10}} 
              style={[
                {width: 100, height: 100, marginTop: 20, marginLeft: 20, position: 'absolute'}
              ]}
            />
        </View>

        <View style={styles.userInfo}>
          <LabelText 
            title="Apelido"  
            color={color}
          />
          <TextInput style={[
              {},
              styles.textConfig
            ]}>
              {user?.nome}
          </TextInput>

          <LabelText 
            title="Senha"  
            color={color}
          />
          <TextInput style={[
              {},
              styles.textConfig
            ]}>
              {}
          </TextInput>

          <LabelText 
            title="Email"  
            color={color}
          />
          <TextInput style={[
              {},
              styles.textConfig
            ]}>
              {user?.email}
          </TextInput>

          <LabelText 
            title="Turma"  
            color={color}
          />
          <Text style={styles.textConfig}>
              {}
          </Text>

          <LabelText 
            title="Tema"  
            color={color}
          />
          <Text style={styles.textConfig}>Funcionalidade ainda não disponivel</Text>
        </View>
        
			</ScrollView>
		</View>
	);
}