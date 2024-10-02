import { InterfaceCreateCategory, InterfaceGetFilters } from "../interfaces/Categories";
import { Api }                  from "../api/Api";
import { InterfaceResponse }    from "../interfaces/DataResponse";

export abstract class ServicesCategories{
    static getCategories(){
        return Api.get<InterfaceGetFilters>("/filters/en");
    }

    static createCategory(body: any){
        return Api.post<InterfaceResponse<InterfaceCreateCategory>>("/filters", body);
    }

    static editCategory(id: string, body: any){
        return Api.patch("/filters/" + id, body);
    }

    static deleteCategory(id: string){
        return Api.delete("/filters/" + id);
    }
}