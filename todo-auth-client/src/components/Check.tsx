import {  useState } from "react";

import { getTodos } from "../services/todoService";
import { loginUser, logoutUser } from "../services/authService";

interface Todo {
    _id: number; 
    title: string;
    description: string;
    completed: boolean;
}

function Check() {
    const [login, setLogin] = useState(false);
    //const [token, setToken] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [got, setGot] = useState(false);
    const handleLogin = async () => {
        const res = await loginUser({ "username": "username eight", "password": "password" });
        console.log(res?.data);
        //setToken(res?.data.data.accessToken);
        //console.log(token);
        if (res?.status === 200) {
            setLogin(true);
        }
    }
    // const handleLogout = async (data:string) => {
    //     const res = await logoutUser(data);
    //     console.log(res?.data);
    //     if (res?.status === 200) {
    //         setLogin(false);
    //     }
    // }
    const handleLogout = async () => {
        const res = await logoutUser();
        console.log(res?.data);
        if (res?.status === 200) {
            setLogin(false);
        }
    }

    const handleGetTodos =  async() => {
        const res = await getTodos();
        console.log(res?.data);
        if (res?.status === 200) {
            setTodos(res.data.data);
            setGot(true);
        }
        console.log(todos);
        console.log(todos.length);
        todos.map(todo => console.log(`${todo._id}___${todo.title}___${todo.description}___${todo.completed}`));
        
    }
    return <><h1>hi there</h1>
        <h1>{login}</h1>
        {!login ? <button onClick={handleLogin}>Login here</button> : <button onClick={() => handleLogout()}>logout</button>}
        <button onClick={handleGetTodos}>get all todos</button>
        <h1>{got}</h1>
    </>;
}
export default Check;