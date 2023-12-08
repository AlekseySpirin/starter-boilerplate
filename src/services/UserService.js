import axios from 'axios';

const { API_BASE_URL = 'https://jsonplaceholder.typicode.com' } = process.env;

class UserService {
	static async getUserById(userId) {
		try {
			const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching user with ID ${userId}:`, error);
			throw error;
		}
	}
	
	static async getUsers() {
		try {
			const response = await axios.get(`${API_BASE_URL}/users`);
			return response.data;
		} catch (error) {
			console.error('Error fetching users:', error);
			throw error;
		}
	}
}

export default UserService;
