import {  useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

const Index: React.FC = () => {
    const [login, setLogin] = useState(false);
    const handleLogin = async () => {
        const res = await loginUser({ "username": "username seven", "password": "password" });
        console.log(res?.data);
        if (res?.status === 200) {
            setLogin(true);
        }
    }
    const handleLogout = async () => {
        const res = await logoutUser();
        if (res?.status === 200) {
            setLogin(false);
        }
    }
    return <><h1>hi there</h1>
        <h1>{login}</h1>
        {!login?<button onClick={handleLogin}>Login here</button>:<button onClick={handleLogout}>logout</button>}
            
    </>;
}
export default Index;