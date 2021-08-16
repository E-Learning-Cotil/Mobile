import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

//import {  } from '../screens/';
//import {  } from '../screens/';
import { LandingPage } from '../screens/LandingPage';
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
	return(
		<Navigator
			initialRouteName='LandingPage'
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: theme.colors.background
				}
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