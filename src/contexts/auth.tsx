import React, { createContext, ReactNode, useState } from 'react';

import SignIn from '../services/auth';

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

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(): Promise<void>;
	signOut(): void;
}

export function AuthProvider ({ children }: AuthProviderProps) {
	const [ user, setUser ] = useState<User | null>(null);

    async function signIn() {
        const response = await SignIn();
        
		const { token, user } = response;

		setUser(user)
    }

	function signOut() {
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ signed: Boolean(user),  user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);	
} 

export default AuthContext