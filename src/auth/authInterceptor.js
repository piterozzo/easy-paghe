import axios from 'axios';

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);
