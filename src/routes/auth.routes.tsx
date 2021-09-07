import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import { CustomDrawer } from '../components/CustomDrawer'
import { LandingPage } from '../screens/LandingPage';
import { SignIn } from '../screens/SignIn';
import { Menu } from '../screens/Menu';

// const { Navigator, Screen } = createStackNavigator();
const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
	return(
		<Navigator
			initialRouteName="LandingPage"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen 
				name="LandingPage"
				component={LandingPage}
			/>

			<Screen 
				name="SignIn"
				component={SignIn}
			/>
		</Navigator>
	)
}