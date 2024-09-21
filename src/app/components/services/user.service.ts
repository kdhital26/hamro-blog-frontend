import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    readonly getAllUsersURL: string = `${environment.apiUrl}getusers`;
    constructor(private http: HttpClient) {

    }

    getAllUser() {
        return this.http.post(this.getAllUsersURL, {observe: 'response'});
    }
}