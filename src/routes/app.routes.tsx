import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from '../global/styles/theme';

import { CustomDrawer } from '../components/CustomDrawer'

import { Home } from '../screens/Home';
import { Turmas } from '../screens/Turmas';
import { Boletim } from '../screens/Boletim';
import { Configuracoes } from '../screens/Configuracoes';
import { Conversas } from '../screens/Conversas';
import { Atividades } from '../screens/Atividades';

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
				name="Atividades"
				component={Atividades}
			/>
		</Navigator>
	)
}