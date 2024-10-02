import CryptoJS  from "crypto-js";

const cifrate = process.env.REACT_APP_CIFRATE_STORAGE === "true"? true : false;
const wordSecret = process.env.REACT_APP_WORD_SECRET_TO_STORAGE!;

export class LocalStorage{
    static getItem(key: string){
        if(cifrate){
            const keyEncrypted = localStorage.getItem( findWordSecret[key] );
            return keyEncrypted? JSON.parse( CryptoJS.AES.decrypt(keyEncrypted, wordSecret).toString(CryptoJS.enc.Utf8) ): null;
        }else{
            return JSON.parse( localStorage.getItem(key)! );
        }
    }

    static setItem(key: string, value: any){
        if(cifrate){
            localStorage.setItem(findWordSecret[key], CryptoJS.AES.encrypt( JSON.stringify(value), wordSecret).toString());
        }else{
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    static removeItem(key: string){
        if(cifrate){
            localStorage.removeItem(findWordSecret[key]);
        }else{
            localStorage.removeItem(key);
        }
    }

    static removeAll(){
        localStorage.clear();
    }
}

// All keys are always string's, each property has 8 characters
const findWordSecret: any = {
    user_authenticated_mycommands: "87H6J--#",
    email: "Q4fX_#%%"
}