import axios from "axios";
import { useState } from "react";
import { setAuthToken } from "./AuthToken";

export const apiUrl = "http://3.218.8.102/api/batches?page=0&size=20&sort=id,asc"

async function loginUser(credentials) {
    const response = await axios.post('http://3.218.8.102/api/authenticate', credentials);
    const { id_token } = response.data;
    return id_token;
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        localStorage.setItem("token", token);
        setAuthToken(token);
    }
}
