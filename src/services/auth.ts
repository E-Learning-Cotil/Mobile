import api from '../services/api';

interface User {
	foto: string;
	nome: string;
	telefone: string;
	email: string;
	id: number;
	role: string
}

interface Response {
    token: string;
    user: User;
	status: number;
	message: string;
}

interface AuthData {
	email: string;
	password: string;
	role: 'ALUNO' | 'PROFESSOR';
}

export async function signIn ({ email, password, role }: AuthData): Promise<Response> {
	const {
		data: {
			token,
			user,
			message = "Login realizado com sucesso!"
		},
		status
	} = await api.post('/authenticate', {email, password, role});

	return {
		token,
		user,
		status,
		message
	}
}