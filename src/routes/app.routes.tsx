import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from '../global/styles/theme';

import { CustomDrawer } from '../components/CustomDrawer'
import { LandingPage } from '../screens/LandingPage';
import { SignIn } from '../screens/SignIn';
import { Menu } from '../screens/Menu';

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
				name="Menu"
				component={Menu}
			/>
		</Navigator>
	)
}