import {  useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

function Check() {
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState('');
    const handleLogin = async () => {
        const res = await loginUser({ "username": "username seven", "password": "password" });
        console.log(res?.data);
        setToken(res?.data.data.accessToken);
        console.log(token);
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
    return <><h1>hi there</h1>
        <h1>{login}</h1>
        {!login?<button onClick={handleLogin}>Login here</button>:<button onClick={()=>handleLogout()}>logout</button>}
            
    </>;
}
export default Check;