import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from '../global/styles/theme';

import { CustomDrawer } from '../components/CustomDrawer'

import { Home } from '../screens/Home';
import { Turmas } from '../screens/Turmas';
import { Boletim } from '../screens/Boletim';
import { Configuracoes } from '../screens/Configuracoes';
import { Conversas } from '../screens/Conversas';
import { Conversa } from '../screens/Conversa';
import { Atividades } from '../screens/Atividades';
import { Atividade } from '../screens/Atividade';
import { Turma } from '../screens/Turma';
import { Topico } from '../screens/Topico';

const { Navigator, Screen } = createDrawerNavigator();

export function AppRoutes() {
	return(
		<Navigator
			initialRouteName="LandingPage"
			backBehavior="history"
			screenOptions={{
				headerShown: false,
				drawerPosition: 'right',

				drawerStyle: {
					backgroundColor: theme.colors.background,
				},
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}
		>
			<Screen 
				name="Home"
				component={Home}
			/>

			<Screen
				name="Turmas"
				component={Turmas}
			/>

			<Screen
				name="Boletim"
				component={Boletim}
			/>

			<Screen 
				name="Configuracoes"
				component={Configuracoes}
			/>

			<Screen 
				name="Conversas"
				component={Conversas}
			/>

			<Screen 
				name="Conversa"
				component={Conversa}
				options={{ swipeEnabled: false }}
			/>

			<Screen 
				name="Atividades"
				component={Atividades}
			/>

			<Screen 
				name="Turma"
				component={Turma}
			/> 

			<Screen 
				name="Atividade"
				component={Atividade}
			/>

			<Screen 
				name="Topico"
				component={Topico}
			/>
		</Navigator>
	)
}