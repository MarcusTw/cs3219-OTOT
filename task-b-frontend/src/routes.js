import { PROD_API } from './environment';
import axios from "axios";

const HEADER = { headers: { 'Access-Control-Allow-Origin': '*'}};

const GET_USERS = () => {
    return axios.get(PROD_API, HEADER);
};

const POST_USER = (user) => {
    return axios.post(PROD_API, user);
};

const DELETE_USER = (name) => {
    return axios.delete(PROD_API + `/${name}`);
};

const PUT_USER = (user) => {
    return axios.put(PROD_API + `/${user.name}`, user);
};

export {GET_USERS, POST_USER, DELETE_USER, PUT_USER};