interface Response {
    token: string,
    user: {
        foto: string,
		nome: string,
		telefone: string,
		email: string,
		id: number,
		role: string
    }
}

export default function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => { 
            resolve({
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoiQUxVTk8iLCJpYXQiOjE2MzEwMTk2OTUsImV4cCI6MTYzMTEwNjA5NX0.t36uy9krEgriuSyiWNbmDCzwGcNXmzVj6_Bz3ANqEsw',
                user: {
					foto: 'https://i.imgur.com/5hT8bpz.jpg',
					nome: 'João',
					telefone: '19987654321',
					email: 'emailAluno1@email.com',
					id: 1,
					role: 'ALUNO'
                },
            });
        }, 500);
    })
}