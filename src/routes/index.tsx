import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { View, ActivityIndicator } from 'react-native';

export function Routes () {
	const { signed, loading } = useAuth();

	if (loading) {
		return (
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#999" />
			</View>
		);
	}

	return (
		<NavigationContainer >
			{ signed ? <AppRoutes/> : <AuthRoutes /> }
		</NavigationContainer>
	) 
}