import { loginInputs } from "../interfaces/Login";

export const ServicesLogin = async(values: loginInputs) => {
    const res = await fetch(process.env.REACT_APP_API_URL! + process.env.REACT_APP_PATH_ADMIN + "/users/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    if(res.ok){
        return await res.json();
    }

    // Manage error
    if(res.status === 404){
        throw await res.text();
    }else{
        throw await res.json();
    }
}