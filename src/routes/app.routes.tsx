import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from '../global/styles/theme';

import { CustomDrawer } from '../components/CustomDrawer'
import { LandingPage } from '../screens/LandingPage';

import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';
import { Turmas } from '../screens/Turmas';

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
		</Navigator>
	)
}