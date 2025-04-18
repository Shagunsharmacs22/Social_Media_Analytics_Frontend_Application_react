import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Replace with test server in real case

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getPosts = () => axios.get(`${BASE_URL}/posts`);
export const getComments = () => axios.get(`${BASE_URL}/comments`);
