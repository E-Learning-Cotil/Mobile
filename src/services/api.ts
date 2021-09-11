import axios from 'axios';

const api = axios.create({
	baseURL: 'https://elearning-tcc.herokuapp.com'
});

export default api;