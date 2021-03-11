import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ea103-default-rtdb.firebaseio.com'
});


export default instance;