import CryptoJS  from "crypto-js";

const cifrate = process.env.REACT_APP_CIFRATE_STORAGE === "true"? true : false;
const wordSecret = process.env.REACT_APP_WORD_SECRET_TO_STORAGE!;

export class SessionStorage{
    static getItem(key: string){
        if(cifrate){
            const keyEncrypted = sessionStorage.getItem( findWordSecret[key] );
            return keyEncrypted? JSON.parse( CryptoJS.AES.decrypt(keyEncrypted, wordSecret).toString(CryptoJS.enc.Utf8) ): null;
        }else{
            return JSON.parse( sessionStorage.getItem(key)! );
        }
    }

    static setItem(key: string, value: any){
        if(cifrate){
            sessionStorage.setItem(findWordSecret[key], CryptoJS.AES.encrypt( JSON.stringify(value), wordSecret).toString());
        }else{
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    static removeItem(key: string){
        if(cifrate){
            sessionStorage.removeItem(findWordSecret[key]);
        }else{
            sessionStorage.removeItem(key);
        }
    }

    static removeAll(){
        sessionStorage.clear();
    }
}

// All keys are always string's, each property has 8 characters
const findWordSecret: any = {
    user: "0--78W€€",
}