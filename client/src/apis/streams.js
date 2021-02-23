import axios from 'axios';

/*
    create API server connection
    we are using json-server to simulate a RESTful API server
*/

export default axios.create({
    baseURL: 'http://localhost:3001/'
});