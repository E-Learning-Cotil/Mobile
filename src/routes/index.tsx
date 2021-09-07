import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from '../contexts/auth';

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes () {
	const { signed } = useContext(AuthContext);

	return (
		<NavigationContainer >
			{ signed ? <AppRoutes/> : <AuthRoutes /> }
		</NavigationContainer>
	) 
}