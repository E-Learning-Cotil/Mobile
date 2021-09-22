import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { LandingPage } from '../screens/LandingPage';
import { SignIn } from '../screens/SignIn';

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