import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
	children: ReactNode;
}

interface User {
	foto: string;
	nome: string;
	telefone: string;
	email: string;
	id: number;
	role: string;
}

interface AuthResponse {
	status: number;
	message: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
	loading: boolean;
    signIn({ email, password, role }: AuthData): Promise<AuthResponse>;
	signOut(): void;
}

interface AuthData {
	email: string;
	password: string;
	role: 'ALUNO' | 'PROFESSOR';
	rememberUser: boolean;
}

export function AuthProvider ({ children }: AuthProviderProps) {
	const [ user, setUser ] = useState<User | null>(null);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		async function loadStoragedData () {
			const now = Date.now();
			const setDate = Number(await AsyncStorage.getItem('@Elearning:setDate'));

			const hoursDiff = Math.abs(now - setDate) / 36e5;

			if (hoursDiff < 24) {
				const storagedUser = await AsyncStorage.getItem('@Elearning:user');
				const storagedToken =  await AsyncStorage.getItem('@Elearning:token');

				if (storagedUser && storagedToken) {
					setUser(JSON.parse(storagedUser));
					api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
				}
			}

			setLoading(false);
		}

		loadStoragedData();
	}, []);

    async function signIn ({ email, password, role, rememberUser }: AuthData) {
		try {
			const response = await auth.signIn({
				email,
				password,
				role
			});
			
			const { token, user, status, message } = response;
			
			setUser(user)

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			if (rememberUser) {
				await AsyncStorage.setItem('@Elearning:user', JSON.stringify(user));
				await AsyncStorage.setItem('@Elearning:token', token);

				const now = Date.now().toString();
				await AsyncStorage.setItem('@Elearning:setDate', now);
			}
	
			return {
				status,
				message
			}
		}
		catch (error: any) {
			return {
				status: error.response?.status,
				message: error.response?.data.error
			}
		}
    }

	function signOut () {
		AsyncStorage.clear().then(() => {
			setUser(null);
		});
	}

	return (
		<AuthContext.Provider value={{ signed: Boolean(user), user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);	
} 

export function useAuth () {
	const context = useContext(AuthContext);

	return context;
}