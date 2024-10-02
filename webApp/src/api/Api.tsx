import { SessionStorage } from "../utils/SessionStorage";

export abstract class Api {
    static async get<T>(path: string): Promise<T>{
        const user = SessionStorage.getItem("user");
        const resp = await fetch(process.env.REACT_APP_API_URL + path, 
            {
                headers: {
                    'Accept': 'application/json',
                    xen: "Bearer " + user.xen,
                },
                method: "GET"
            });
        if(resp.ok){
            return await resp.json();
        }else{
            throw await resp.json();
        }
    }

    static async post<T>(path: string, body: any): Promise<T>{
        const user = SessionStorage.getItem("user");
        const resp = await fetch(
            process.env.REACT_APP_API_URL! + process.env.REACT_APP_PATH_ADMIN + path, 
            {
                headers: {
                    'Accept': 'application/json',
                    xen: "Bearer " + user.xen,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                method: "POST"
            });
        if(resp.ok){
            return await resp.json();
        }else{
            throw await resp.json();
        }
    }

    static async patch<T>(path: string, body: any): Promise<T>{
        const user = SessionStorage.getItem("user");
        const resp = await fetch(
            process.env.REACT_APP_API_URL! + process.env.REACT_APP_PATH_ADMIN + path, 
            {
                headers: {
                    'Accept': 'application/json',
                    xen: "Bearer " + user.xen,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                method: "PATCH"
            });
        if(resp.ok){
            return await resp.json();
        }else{
            throw await resp.json();
        }
    }

    static async delete<T>(path: string): Promise<T>{
        const user = SessionStorage.getItem("user");
        const resp = await fetch(
            process.env.REACT_APP_API_URL! + process.env.REACT_APP_PATH_ADMIN + path, 
            {
                headers: {
                    'Accept': 'application/json',
                    xen: "Bearer " + user.xen,
                    "Content-Type": "application/json",
                },
                method: "DELETE"
            });
        if(resp.ok){
            return await resp.json();
        }else{
            throw await resp.json();
        }
    }
}