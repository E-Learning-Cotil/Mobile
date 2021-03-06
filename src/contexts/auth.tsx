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
	id: string;
	role: 'ALUNO' | 'PROFESSOR';
}

interface AuthResponse {
	status: number;
	message: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
	updateUser(user: User): void;
	loading: boolean;
    signIn({ email, password, role }: AuthData): Promise<AuthResponse>;
	signOut(): void;
	token: string | null;
}

interface AuthData {
	email: string;
	password: string;
	role: 'ALUNO' | 'PROFESSOR';
	rememberUser: boolean;
}

export function AuthProvider ({ children }: AuthProviderProps) {
	const [ user, setUser ] = useState<User | null>(null);
	const [ userToken, setUserToken ] = useState<string | null>(null);
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
					setUserToken(storagedToken);
					api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
				}
			}

			setLoading(false);
		}

		loadStoragedData();
	}, []);

	function updateUser (user: User) {
		setUser(user);

		AsyncStorage.setItem('@Elearning:user', JSON.stringify(user));
	}

    async function signIn ({ email, password, role, rememberUser }: AuthData) {
		try {
			const response = await auth.signIn({
				email,
				password,
				role
			});
			
			const { user, token, status, message } = response;
			
			setUser(user);
			
			api.defaults.headers['Authorization'] = `Bearer ${token}`;
			setUserToken(token);

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
		<AuthContext.Provider value={{ signed: Boolean(user), user, updateUser, loading, signIn, signOut, token: userToken }}>
			{children}
		</AuthContext.Provider>
	);	
} 

export function useAuth () {
	const context = useContext(AuthContext);

	return context;
}